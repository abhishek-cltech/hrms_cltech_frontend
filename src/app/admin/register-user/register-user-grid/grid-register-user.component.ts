import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables/src/angular-datatables.directive';
import { environment } from 'src/environments/environment';
import { HttpStatus } from 'src/app/constant/enum';
import { ResumeModalComponent } from 'src/app/pop-up/resume-modal/resume-modal.component';
import { LocalStorageService } from 'src/app/common/utility/localStorage.service';
import { AuthticationService } from 'src/app/authentication/authentication.service';
@Component({
  selector: 'app-grid-register-user.component',
  templateUrl: './grid-register-user.component.html',
  styleUrls: ['./grid-register-user.component.css']
})
export class GridRegisterUserComponent implements OnInit{

  backenedUrl = environment.BACKEND_URL;
  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective, { static: false })
  datatableElement!: DataTableDirective;
  confirmation:any;
  removeHedear:boolean=false;
  removeFooter:boolean=false;
  extraParam={"extraParam":4};
  title="Register User"
  users:any;
   displayedColumn:any=[
     { 
      title: 'ID',
      data: 'id',
      name: 'id',
     },
     {
       title: 'Name',
       data: 'firstName' ,
       name: 'firstName',
      },
      {
         title: 'Email',
         data: 'email' ,
         name: 'email',
        },

        {
          title: 'Role',
          data: 'role' ,
          name: 'role',
         },
    
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
            this.backenedUrl+"authentication/getAllRegisterUser",
            Object.assign(dataTablesParameters,this.extraParam), { }
             ).subscribe((resp:any) => {
              if(resp!=null && resp.response!=null && resp.response.data && resp.status==HttpStatus.SUCCESS  ){
                that.users = resp.response?.data;
                //Once API fetched data successfully inform datatable by invoking the callback
                 callback({
                   recordsTotal: resp.response.recordsTotal,
                   recordsFiltered: resp.response.recordsFiltered,
                   data: []
                 });
              }else{
                that.users = null;
              }
          });
      },
      columns: this.displayedColumn,
    };
  }

 
  action(action:string,id:any){
    if(action=="edit"){
      this.router.navigate(["/admin/register-user/edit-register-user"],{ queryParams: { param: id },skipLocationChange:true})
    }else if(action=="add"){
      this.router.navigate(["/admin/register-user/add-register-user"],{ queryParams: { param: id },skipLocationChange:true})
    }else if(action=="view"){
      this.router.navigate(["/admin/register-user/view-register-user"],{ queryParams: { param: id },skipLocationChange:true})
    }else{
    }
 }
}   
