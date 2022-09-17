import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router, TitleStrategy } from '@angular/router';
import { AuthticationService } from 'src/app/authentication/authentication.service';
import { CustomValidators } from 'src/app/common/customValidators/validator';
import { LocalStorageService } from 'src/app/common/utility/localStorage.service';
import { RefreshPageService } from 'src/app/common/utility/refreshPage.service ';
import { SnackbarService } from 'src/app/common/utility/snackbar.service';
import { HttpStatus } from 'src/app/constant/enum';
import { AdminService } from '../../admin.service';
import { User } from '../../user';


@Component({
  selector: 'app-add-recruiter.component',
  templateUrl: './add-recruiter.component.html',
  styleUrls: ['./add-recruiter.component.css'],
  encapsulation: ViewEncapsulation.None 
})
export class AddRecruiterComponent implements OnInit {
backUrl='/admin';
department= [1,4];
roles:any;
showPassword:boolean=false;
showConfirmPassword:boolean=false;
departments:any;
  constructor(
    private router: Router,
    private service:AdminService,
    private authService:AuthticationService,
    private snackbarService:SnackbarService,
    private activatedRoute:ActivatedRoute,
    private  dialogRef: MatDialogRef<AddRecruiterComponent>,
    private refreshPageService:RefreshPageService,
    @Inject(MAT_DIALOG_DATA) public data: any,

  ) { 


  }

  ngOnInit(): void {
    this.getAllDepartments();
    this.getRole();

  }
  title="Add Recruiter"
  userForm= new FormGroup({
    id:new FormControl(""),
    email:new FormControl("",[Validators.required,Validators.email]),
    firstName:new FormControl("",[Validators.required]),
    lastName:new FormControl("",[Validators.required]),
    password:new FormControl("",[Validators.required,Validators.minLength(8)]),
    confirmPassword:new FormControl("",[Validators.required]),
    roleId:new FormControl("",[Validators.required]),
    departments:new FormControl("",[Validators.required]),
    isActive:new FormControl(true,[]),
  },CustomValidators.passwordMatch('password', 'confirmPassword') 
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
    model.firstName=this.userForm.value.firstName;
    model.lastName=this.userForm.value.lastName;
    model.roleId=Number(this.userForm.value.roleId);
    model.password=this.userForm.value.password;
    model.confirmPassword=this.userForm.value.confirmPassword;
   // console.log(model)
    this.service.registration(model).subscribe((data)=>{
      if(data!=null && data.response!=null && data.status===HttpStatus.SUCCESS){
        this.snackbarService.openSucessSnackBar(data.message,this.backUrl);
        this.dialogRef.close();
        this.refreshPageService.refresh();
      }else{
        this.snackbarService.openErrorSnackBar(data.message)
      }
    })

  }
  toggleVisibilityOfPassword(){
    this.showPassword=!this.showPassword;
  }

  toggleVisibilityOfConfirmPassword(){
    this.showConfirmPassword=!this.showConfirmPassword;
  }

  getRole(){
    this.authService.getRole().subscribe((data:any)=>{
      if(data!=null && data.response!=null && data.status==HttpStatus.SUCCESS){
        this.roles=data.response;
        this.userForm.patchValue(
          {
            'roleId':data.response[0]?.id
          }
        )
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

  onKeyUpEvent(event: any){
    this.userForm.markAllAsTouched();
    const password = this.userForm.value.password;
    const confirm = this.userForm.value.confirmPassword;
    this.userForm.controls['password'].setErrors({...this.userForm.controls['password'].errors,'mismatch': true});
    this.userForm.controls['confirmPassword'].setErrors({...this.userForm.controls['password'].errors,'mismatch': true});
    if(password!="" && confirm!=""  && password === confirm){  
      this.userForm.controls['password'].setErrors(null);
      this.userForm.controls['confirmPassword'].setErrors(null);
    }
  }
}
 