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
import { EditUserDepartmentComponent } from '../user/edit-user-department/edit-user-department.component';
import { AddDepartmentComponent } from './add-department/add-department.component';
import { ViewDepartmentComponent } from './view-department/view-department.component';
import { EditDepartmentComponent } from './edit-department/edit-department.component';
@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {
  backenedUrl = environment.BACKEND_URL;
  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective, { static: false })
  datatableElement!: DataTableDirective;
  extraParam={"extraParam":4};
  title="Departments"
  backUrl="/admin";
  departments:any;
   displayedColumn:any=[

     { 
      title: 'ID',
      data: 'id',
      name: 'id',
      
    },
     

      {
        title: 'Department',
         data: 'departmentName' ,
         name: 'departmentName',
         
        },
        {
          title: 'Active',
           data: 'active' ,
           name: 'active',
           
          },
        
    
     { 
      title: 'Action',
      data:"Action",searchable:false,orderable: false,
      class:"action",
      
    }
     
    ];


  constructor(
    private http: HttpClient,
    private router:Router,
    public dialog: MatDialog,
    ) {}
  
  ngOnInit(): void {
    this.loadTable();
  }

  loadTable(){
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
      scrollY:"350px",
       scrollX:true,
      order: [[0, 'desc']],
      language: {
        searchPlaceholder: "Search Here"
          },
       ajax: (dataTablesParameters: any, callback) => {
        that.http
          .post<any>(
            this.backenedUrl+"department/getAllDepartmentGrid",
            Object.assign(dataTablesParameters,this.extraParam), { }
             ).subscribe((resp:any) => {
              if(resp!=null && resp.response!=null && resp.response.data && resp.status==HttpStatus.SUCCESS  ){
                that.departments = resp.response?.data;
                //Once API fetched data successfully inform datatable by invoking the callback
                 callback({
                   recordsTotal: resp.response.recordsTotal,
                   recordsFiltered: resp.response.recordsFiltered,
                   data: []
                 });
              }else{
                that.departments = null;
              }
          });
      },
      columns: this.displayedColumn,
    };
  
  }

  backToRecruiters(){
    this.router.navigate([this.backUrl])
  }
action(action:string,id:any){
   let dialogRef:any;
    if(action=="edit"){
       dialogRef= this.dialog.open(EditDepartmentComponent, {
        width: '500px',
        disableClose:true,
         data: {'id': id,"title":"Edit Department"},
       });
       
    }else if(action=="view"){
      this.dialog.open(ViewDepartmentComponent, {
        width: '500px',
        disableClose:true,
         data: {'id': id,"title":"View Department"},
       });
    }else if(action=="add"){
      this.dialog.open(AddDepartmentComponent, {
        width: '500px',
        disableClose:true,
         data: {'id': id,"title":"Add Department"},
       });
    }
    dialogRef?.afterClosed().subscribe((result: { event: string; url: any; })  => {
      if(result.event == 'add'){
        console.log(result.url)
        this.router.navigate([result.url])
      }else if(result.event == 'edit'){
        console.log(result.url)
        this.router.navigate([result.url])
      }else if(result.event == 'delete'){
        this.router.navigate([result.url])
      }
    });
  }
  
}   

