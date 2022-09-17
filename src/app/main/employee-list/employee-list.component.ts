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
import { EmployeeResumeService } from '../shared/employee-resume.service';
import { EmployeeDetail, EmployeeResume } from '../shared/employee-resume';
import { SnackbarService } from 'src/app/common/utility/snackbar.service';
@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  backenedUrl = environment.BACKEND_URL;
  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective, { static: false })
  datatableElement!: DataTableDirective;
  title="Applicant"
  user:any=[];
  extraParam={"extraParam":this.localStorageService.getLocalStorage('USER_NAME_SESSION_ATTRIBUTE_NAME')};
  displayedColumns: string[] = ['name', 'email', 'phone','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(
    private http: HttpClient,
    private router:Router,
    public dialog: MatDialog,
    private localStorageService:LocalStorageService,
    private service :EmployeeResumeService,
    private snackbarService:SnackbarService
    ) {}
  
  
  ngOnInit(): void {
    this.getApplicant();
  }

  
 
  getApplicant(){
    let model=new EmployeeResume();
    let employeeDetail=new EmployeeDetail();
    employeeDetail.email=this.localStorageService.getLocalStorage('USER_NAME_SESSION_ATTRIBUTE_NAME');
    model.employeeDetail=employeeDetail;
    this.service.getApplicant(model).subscribe((data)=>{
      if(data!=null && data.response!=null && data!=undefined && data.status===HttpStatus.SUCCESS){
          // Assign the data to the data source for the table to render
          this.user=data.response;
         this.dataSource = new MatTableDataSource(data.response);
         this.dataSource.paginator = this.paginator;
         this.dataSource.sort = this.sort;
      }else{
        this.snackbarService.openErrorSnackBar(data.message)
      }
    })
    
  }

  action(action:string,id:any){
    if(action=="edit"){
     this.router.navigate(["resumeBuilder/edit-employee"],{ queryParams: { param: id },skipLocationChange:true})
    }else if(action=="view"){
      this.router.navigate(["resumeBuilder/view-employee"],{queryParams:{param:id},skipLocationChange:true})
    }else if(action=="preview"){
      this.openResumeDialogBox(id);
    }else if(action=="preview-resume"){
      this.router.navigate(["resumeBuilder/preview-resume"],{queryParams:{param:id},skipLocationChange:true})
    }
    else if(action=="add"){
      this.router.navigate(["resumeBuilder/add-employee"],{queryParams:{param:id},skipLocationChange:true})
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
}   
