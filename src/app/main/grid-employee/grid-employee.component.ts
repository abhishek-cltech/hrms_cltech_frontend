import { ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
import { RefreshPageService } from 'src/app/common/utility/refreshPage.service ';
import { SnackbarService } from 'src/app/common/utility/snackbar.service';
import { EmployeeResumeService } from '../shared/employee-resume.service';
@Component({
  selector: 'app-grid-employee',
  templateUrl: './grid-employee.component.html',
  styleUrls: ['./grid-employee.component.css']
})
export class GridEmployeeComponent implements OnInit ,OnDestroy{

 
  backenedUrl = environment.BACKEND_URL;
  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective, { static: false })
  datatableElement!: DataTableDirective;
  title="Applicant"
  confirmation:any;
  flag = true;
  hideSpinner=true;
  @ViewChild('UploadFileInput', { static: false })
  uploadFileInput!: ElementRef;
   fileUploadForm!: FormGroup;
   fileInputLabel!: string;
   form: FormGroup = this.formBuilder.group({
    myfile: ['',[Validators.required]]
  });
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
      title: 'Action',
      data:"Action",searchable:false,orderable: false,
      class:"action"
    }
     
    ];

//   displayedColumn:any=[{
//     title: 'ID',
//     data: 'id',
//     name: 'id',
//   }, {
//     title: 'First name',
//     data: 'firstName',
//     name:"firstName"
//   }, {
//     title: 'Last name',
//     data: 'lastName',
//     name:"lastName"
//   },
//   {
//     title: 'Action',searchable:false,orderable: false,
//  },

//];
  constructor(
    private http: HttpClient,
    private router:Router,
    public dialog: MatDialog,
    private localStorageService:LocalStorageService,
    private formBuilder: FormBuilder,
    private snackbarService: SnackbarService,
    private service:EmployeeResumeService,
    private refreshpageService:RefreshPageService
    ) {
      
    }
  
  dtTrigger: Subject<any> = new Subject<any>();
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
       //scrollY:"350px",
      // scrollX:true,
      order: [[0, 'desc']],
      language: {
        searchPlaceholder: "Search Here"
          },
       ajax: (dataTablesParameters: any, callback) => {
        that.http
          .post<any>(
           //'https://angular-datatables-demo-server.herokuapp.com/',
            this.backenedUrl+"employee/getAllEmployees",
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

  
 
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
  // users(): void {
  //   this.http.post( 'https://angular-datatables-demo-server.herokuapp.com/',
  //             dataTablesParameters, {})
  //       .subscribe((response: any) => {
  //         this.persons = response;
  //         // initiate our data table
  //         this.dtTrigger.next();
  //       });
  // }

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
  onFileSelect(event:any) {
    let af = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel']
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      //  console.log(file);
      let type = file.type;
      
      if (file["type"]!=="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
        alert('Only EXCEL Docs Allowed!');
      } else {
        this.fileInputLabel = file.name;
        this.form.get('myfile')?.setValue(file);
      }
    }
  }

  save(){
    console.log(this.form.value.myfile);
      if (!this.form.valid) {
        return ;
      }
        this.hideSpinner = false;
       let formData = new FormData();
       formData.append('file', this.form.value.myfile);
       this.service.bulkUpload(formData).subscribe((data:any)=>{
        if(data!=null && data.status===HttpStatus.SUCCESS){
          this.hideSpinner = true;
          this.snackbarService.openSucessSnackBar(data.message,"");
          this.refreshpageService.refresh();
          // this.flag= true;
        }else{
          this.snackbarService.openErrorSnackBar(data.message)
          this.hideSpinner = true;
        }
      })


  }
}
