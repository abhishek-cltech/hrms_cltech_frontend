import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
import { EditUserDepartmentComponent } from './edit-user-department/edit-user-department.component';
import { AuthticationService } from 'src/app/authentication/authentication.service';
import { AddRecruiterComponent } from './add-recruiter/add-recruiter.component';
import { AdminService } from '../admin.service';
import { SnackbarService } from 'src/app/common/utility/snackbar.service';
import { RefreshComponent } from 'src/app/common/refresh/refresh.component';
import { RefreshPageService } from 'src/app/common/utility/refreshPage.service ';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  backenedUrl = environment.BACKEND_URL;
  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective, { static: false })
  datatableElement!: DataTableDirective;
  instruction:string='Do you want delete record?'
  confirmation:any;
  removeHedear:boolean=false;
  removeFooter:boolean=false;
   departments = new FormControl('');
  extraParam={"extraParam":4};
  title="Recruiter"
  users:any;
   displayedColumn:any=[

     { 
      title: 'ID',
      data: 'id',
      name: 'id',
    },
     
     {
      title: 'Email',
       data: 'email' ,
       name: 'email',
      },
      {
        title: 'Department',
         data: 'deparments' ,
         name: 'deparments',
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
    private autService:AuthticationService,
    private adminService:AdminService,
    private snackbarService:SnackbarService,
    private refreshPage:RefreshPageService
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
            this.backenedUrl+"authentication/getAllUser",
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

  navigateToDepartment(){
    this.router.navigate(['admin/department']);
  }
 
  

  action(action:string,id:any){
    // if(action=="edit"){
    //  this.router.navigate(["admin/edit-user-department"],{ queryParams: { param: id },skipLocationChange:true})
    // }
    if(action=="edit"){
      this.dialog.open(EditUserDepartmentComponent, {
        // width: '500px',
        disableClose:true,
         data: {'id': id},
       });
     
      }else if(action=="add"){
       this.dialog.open(AddRecruiterComponent, {
      
      disableClose:true,
       data: {'id': id,'title':"Add Recruiter"},
     });
   
  }else if(action=="remove"){
    this.adminService.removeDepartmentByUserId(id).subscribe((data:any)=>{
      if(data!=null && data.response!=null && data.status==HttpStatus.SUCCESS){
       this.snackbarService.openSucessSnackBar(data.message, this.backenedUrl)
       this.refreshPage.refresh();
      }else{
        this.snackbarService.openErrorSnackBar(data.message)
      }
     })
  }
  
 }
}   
