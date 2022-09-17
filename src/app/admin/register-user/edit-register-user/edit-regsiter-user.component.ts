import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SnackbarService } from 'src/app/common/utility/snackbar.service';
import { HttpStatus } from 'src/app/constant/enum';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomValidators } from 'src/app/common/customValidators/validator';
import { User } from '../../user';
import { AuthticationService } from 'src/app/authentication/authentication.service';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-edit-register-user',
  templateUrl: './edit-register-user.component.html',
  styleUrls: ['./edit-register-user.component.css']
})
export class EditRegisterUserComponent implements OnInit {
  title="Edit Register User"
  dataTableUrl:any="/admin/register-user";
  isIdReadOnlyCheck:boolean=true;
  isReadOnlyCheck:boolean=true;
  isHiddenCheck:boolean=false;
  constructor(
    private snackbar:SnackbarService, 
    private service:AuthticationService, 
    private router:Router,
    private adminservice:AdminService,
    private activatedRoute:ActivatedRoute
  ) { 
     
  }
  form= new FormGroup({
    id:new FormControl(""),
    email:new FormControl("",[Validators.required,Validators.email]),
    firstName:new FormControl("",[Validators.required]),
    lastName:new FormControl("",[Validators.required]),
    password:new FormControl("",[Validators.required,Validators.minLength(8)]),
    confirmPassword:new FormControl("",[Validators.required]),
    roleId:new FormControl("",[Validators.required]),
    isActive:new FormControl(true,[]),
  },  CustomValidators.passwordMatch('password', 'confirmPassword') 
  )
  ngOnInit(): void {
    this.getUserDetail();
  }
  ngAfterViewInit(): void {     
  }
  ngOnDestroy(): void
  {
  }

  backToGrid(){
    this.router.navigate([this.dataTableUrl]);
  }

 save(){
    if(!this.form.valid){
      return;
}

let model =new User();
model.id=Number(this.form.value.id);
model.email=this.form.value.email;
model.firstName=this.form.value.firstName;
model.lastName=this.form.value.lastName;
model.roleId=Number(this.form.value.roleId);
model.password=this.form.value.password;
model.confirmPassword=this.form.value.confirmPassword;
model.active=this.form.value.isActive;
console.log(model)
this.service.registration(model).subscribe((data)=>{
 if(data!=null && data.response!=null && data.status===HttpStatus.SUCCESS){
   this.snackbar.openSucessSnackBar(data.message,this.dataTableUrl);
 }else{
   this.snackbar.openErrorSnackBar(data.message)
 }
})
}
getUserDetail(){
  this.activatedRoute.queryParams.subscribe((params=>{
    const id=params['param'];
    this.adminservice.getUserById(id).subscribe((data:any)=>{
      if(data!=null && data.response!=null && data.status==HttpStatus.SUCCESS){
       this.form.patchValue({
        "id":data.response.id,
        "firstName":data.response.firstName,
        "lastName":data.response.lastName,
        "roleId":data.response.roleId,
        "email":data.response.email,
        "isActive":data.response.active,
       });
       
      }else{
        this.snackbar.openErrorSnackBar(data.message)
      }
     })
  }))
}
}