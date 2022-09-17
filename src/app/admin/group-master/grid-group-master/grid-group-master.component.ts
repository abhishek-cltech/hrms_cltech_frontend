import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DataTableDirective } from 'angular-datatables/src/angular-datatables.directive';
import { environment } from 'src/environments/environment';
import { HttpStatus } from 'src/app/constant/enum';
import { AuthticationService } from 'src/app/authentication/authentication.service';
import { UpdateResumeStatusPopUp } from '../../employee/update-resume-status/update-resume-status.component';
@Component({
  selector: 'app-grid-group-master.component',
  templateUrl: './grid-group-master.component.html',
  styleUrls: ['./grid-group-master.component.css']
})
export class GridGroupMasterComponent implements OnInit{

  backenedUrl = environment.BACKEND_URL;
  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective, { static: false })
  datatableElement!: DataTableDirective;
  confirmation:any;
  removeHedear:boolean=false;
  removeFooter:boolean=false;
  extraParam={"extraParam":4};
  title="Group Master"
  groupMasters:any;
   displayedColumn:any=[
     { 
      title: 'ID',
      data: 'id',
      name: 'id',
     },
     {
       title: 'Group Name',
       data: 'groupName' ,
       name: 'groupName',
      },
      {
         title: 'Code',
         data: 'code' ,
         name: 'code',
        },

        {
          title: 'Value',
          data: 'value' ,
          name: 'value',
         },
        //  {
        //   title: 'Active',
        //   data: 'active' ,
        //   name: 'active',
        //  },
    
     { 
      title: 'Action',
      data:"Action",searchable:false,orderable: false,
      class:"action"
    }
     
    ];


  constructor(
    private http: HttpClient,
    private router:Router,
    public dialog: MatDialog,
    private autService:AuthticationService
    ) {}
  
  ngOnInit(): void {
    const that = this;
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: true,
      searchDelay:1500,
      //responsive: true,
       autoWidth: false,
      jQueryUI: true,
      displayStart:0,
      lengthMenu: [[10, 25, 50, -1], [10, 25, 50, "All"]],
      scrollCollapse: true,
      // scrollY:"200px",
      // scrollX:true,
      order: [[0, 'desc']],
      language: {
        searchPlaceholder: "Search Here"
          },
       ajax: (dataTablesParameters: any, callback) => {
        that.http
          .post<any>(
            this.backenedUrl+"department/getAllGroupMasterGrid",
            Object.assign(dataTablesParameters,this.extraParam), { }
             ).subscribe((resp:any) => {
              if(resp!=null && resp.response!=null && resp.response.data && resp.status==HttpStatus.SUCCESS  ){
                that.groupMasters = resp.response?.data;
                //Once API fetched data successfully inform datatable by invoking the callback
                 callback({
                   recordsTotal: resp.response.recordsTotal,
                   recordsFiltered: resp.response.recordsFiltered,
                   data: []
                 });
              }else{
                that.groupMasters = null;
              }
          });
      },
      columns: this.displayedColumn,
    };
  }

 
  action(action:string,id:any){
    if(action=="edit"){
      this.router.navigate(["/admin/group-master/edit-group-master"],{ queryParams: { param: id },skipLocationChange:true})
    }else if(action=="add"){
      this.router.navigate(["/admin/group-master/add-group-master"],{ queryParams: { param: id },skipLocationChange:true})
    }else if(action=="view"){
      this.router.navigate(["/admin/group-master/view-group-master"],{ queryParams: { param: id },skipLocationChange:true})
    }else{
    }
 }

 
}   
