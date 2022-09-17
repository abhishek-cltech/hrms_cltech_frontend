import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables/src/angular-datatables.directive';
import { environment } from 'src/environments/environment';
import { HttpStatus } from 'src/app/constant/enum';
import { ResumeModalComponent } from 'src/app/pop-up/resume-modal/resume-modal.component';
import { LocalStorageService } from 'src/app/common/utility/localStorage.service';
import { UpdateResumeStatusPopUp } from '../update-resume-status/update-resume-status.component';
import { GroupMasterService } from '../../group-master/shared/group-master.service';
import { EmployeeResume } from 'src/app/main/shared/employee-resume';
import { RefreshPageService } from 'src/app/common/utility/refreshPage.service ';
import { EmployeeResumeService } from 'src/app/main/shared/employee-resume.service';
import { SnackbarService } from 'src/app/common/utility/snackbar.service';
@Component({
  selector: 'app-grid-employee',
  templateUrl: './grid-employee.component.html',
  styleUrls: ['./grid-employee.component.css']
})
export class GridEmployeeComponent implements OnInit{

  backenedUrl = environment.BACKEND_URL;
  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective, { static: false }) datatableElement!: DataTableDirective;
  @ViewChild("table") table: any;
  title="Applicant"
  confirmation:any;
  resumeStatusCode!:string;
  groupMasters:any;
  extraParam={"extraParam":this.localStorageService.getLocalStorage('USER_NAME_SESSION_ATTRIBUTE_NAME')};
  employees:any;
   displayedColumn:any=[

     { 
      title: 'ID',
      data: 'id',
      name: 'id',
    },
     {
      title: 'Name', 
      data: 'name',
      name: 'name',
     }, 
     {
      title: 'Email',
       data: 'email' ,
       name: 'email',
      },
      {
        title: 'Phone',
         data: 'phone' ,
         name: 'phone',
        },

      {
        title: 'Skill',
         data: 'totalSkill',
         name: 'totalSkill'
         },
     {
      title: 'Total Experience',
       data: 'totalExperience' ,
       name: 'totalExperience'
      },
      {
        title: 'Department',
         data: 'lookingFor' ,
         name: 'lookingFor'
        },
        {
          title: 'Status',
           data: 'resumeStatusCode' ,
           name: 'resumeStatusCode'
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
    private localStorageService:LocalStorageService,
    private groupMasterService:GroupMasterService,
    private refreshPage:RefreshPageService,
    private employeeResumeService:EmployeeResumeService,
    private snackbar:SnackbarService,
    private route: ActivatedRoute,
    ) {}
  
  dtTrigger: Subject<any> = new Subject<any>();
  ngOnInit(): void {
    this.loadDataTable();
    this.getGroupMasterByGroupName();
  }

  loadDataTable(){
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
       //scrollY:"350px",
      // scrollX:true,
      order: [[0, 'desc']],
      language: {
        searchPlaceholder: "Search Here"
          },
       ajax: (dataTablesParameters: any, callback) => {
        that.http
          .post<any>(
            this.backenedUrl+"employee/getAllEmployeesForAdmin",
            Object.assign(dataTablesParameters,this.extraParam), { headers: new HttpHeaders({
              'Content-Type':  'application/json',
              'Authorization': 'token'
             })}
             ).subscribe((resp:any) => {
              if(resp!=null && resp.response!=null && resp.response.data && resp.status==HttpStatus.SUCCESS  ){
                that.employees = resp.response?.data;
                //Once API fetched data successfully inform datatable by invoking the callback
                 callback({
                   recordsTotal: resp.response.recordsTotal,
                   recordsFiltered: resp.response.recordsFiltered,
                   data: []
                 });
              }else{
                that.employees = null;
              }
          });
      },
      columns: this.displayedColumn,
    };
  }
  
  action(action:string,id:any){
    if(action=="edit"){
     this.router.navigate(["/admin/applicant/edit-applicant"],{ queryParams: { param: id },skipLocationChange:true})
     }else if(action=="preview"){
      this.openResumeDialogBox(id);
    }else if(action=="add"){
      this.router.navigate(["/admin/applicant/add-applicant"])
    }else if(action=="bulkUpload"){
      this.router.navigate(["excel-upload"],{ relativeTo: this.route })
    }
  }

  openResumeDialogBox(id:number){
    const dialogRef = this.dialog.open(ResumeModalComponent, {
      disableClose: true,
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%',
      panelClass: 'full-screen-modal',
      enterAnimationDuration:'500ms',
      exitAnimationDuration:'300ms',
      data: {"id":id},
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      
    });
  }

  openStatusDialog(id:number,resumeStatusCode:string): void {
    const dialogRef = this.dialog.open(UpdateResumeStatusPopUp, {
      disableClose: true,
      width:'350px',
      data: {id:id,title:"Choose Resume Status",groupMasters:this.groupMasters,resumeStatusCode:resumeStatusCode},
    });

    dialogRef.afterClosed().subscribe((result:EmployeeResume)=>{
      let employeeResume=result;
      if(employeeResume==undefined || employeeResume.resumeStatusCode!=null && employeeResume.resumeStatusCode==resumeStatusCode){
        return;
        }else{
        this.employeeResumeService.updateEmployeeResumeStatus(employeeResume).subscribe((data)=>{
          if(data!=null && data.response!=null && data.status==HttpStatus.SUCCESS){
              this.refreshPage.refresh();
          }else{

          }
        })
       
      }
    }) 
  }
  
  
  
  getGroupMasterByGroupName(){
    this.groupMasterService.getAllGroupMasters().subscribe((data)=>{
      if(data!=null && data.response!=null && data.status===HttpStatus.SUCCESS){
         this.groupMasters=data.response;
      }else{
        this.snackbar.openErrorSnackBar(data.message)
      }
    });
  }
   

 
}   
