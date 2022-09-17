import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router, TitleStrategy } from '@angular/router';
import { AuthticationService } from 'src/app/authentication/authentication.service';
import { LocalStorageService } from 'src/app/common/utility/localStorage.service';
import { RefreshPageService } from 'src/app/common/utility/refreshPage.service ';
import { SnackbarService } from 'src/app/common/utility/snackbar.service';
import { HttpStatus } from 'src/app/constant/enum';
import { AdminService } from '../../admin.service';
import { User } from '../../user';


@Component({
  selector: 'app-edit-user-department',
  templateUrl: './edit-user-department.component.html',
  styleUrls: ['./edit-user-department.component.css'],
  encapsulation: ViewEncapsulation.None 
})
export class EditUserDepartmentComponent implements OnInit {
backUrl='/admin';
department= [1,4];

departments:any;
  constructor(
    private router: Router,
    private service:AdminService,
    private snackbarService:SnackbarService,
    private activatedRoute:ActivatedRoute,
    private  dialogRef: MatDialogRef<EditUserDepartmentComponent>,
    private refreshPageService:RefreshPageService,
    @Inject(MAT_DIALOG_DATA) public data: any,

  ) { 


  }

  ngOnInit(): void {
    this.getAllDepartments();
    this.getUserDetail();

  }
  title="Add User's Department"
  userForm= new FormGroup({
    id:new FormControl("",[Validators.required]),
    email:new FormControl("",[Validators.required,Validators.email]),
    departments:new FormControl(''),
    isActive:new FormControl(true,[]),

  }
  )
  goToLoginPage(){
    this.router.navigate(['/login']);
  }

  editUserDepartment(){
    if(!this.userForm.valid){
           return;
    }

    let model =new User();
    model.id=Number(this.userForm.value.id);
    model.email=this.userForm.value.email;
    const idsArray:any=this.userForm.value.departments;
    model.deparmentIds=idsArray.join();
    model.active=this.userForm.value.isActive;
   // console.log(model)
    this.service.updateUserDepartment(model).subscribe((data)=>{
      if(data!=null && data.response!=null && data.status===HttpStatus.SUCCESS){
        this.snackbarService.openSucessSnackBar(data.message,this.backUrl);
        this.dialogRef.close();
        this.refreshPageService.refresh();
      }else{
        this.snackbarService.openErrorSnackBar(data.message)
      }
    })

  }

  getUserDetail(){
    let id=this.data.id;
    this.service.getUserById(id).subscribe((data:any)=>{
      if(data!=null && data.response!=null && data.status==HttpStatus.SUCCESS){
        let numArary=null;
        if(data.response.deparmentIds!=null){
          let departmentsIds= data.response.deparmentIds.split(",");
           numArary= departmentsIds.map((element:string) => {
            return Number(element)
          });
        }
        
       this.userForm.patchValue({
        "id":data.response.id,
        "email":data.response.email,
        "isActive":data.response.active,
        "departments":numArary
       });
       
      }else{
        this.snackbarService.openErrorSnackBar(data.message)
      }
     })
  }

  getAllDepartments(){
    this.service.getAllDepartments().subscribe((data:any)=>{
      if(data!=null && data.response!=null && data.status==HttpStatus.SUCCESS){
       this.departments=data.response;
      }else{
        this.snackbarService.openErrorSnackBar(data.message)
      }
     })
  }
  
  close(){
    this.dialogRef.close();
  }
}
