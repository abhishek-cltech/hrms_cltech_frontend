import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SnackbarService } from 'src/app/common/utility/snackbar.service';
import { HttpStatus } from 'src/app/constant/enum';
import { Router } from '@angular/router';
import { CustomValidators } from 'src/app/common/customValidators/validator';
import { User } from '../../user';
import { AuthticationService } from 'src/app/authentication/authentication.service';

@Component({
  selector: 'app-add-employee-resume',
  templateUrl: './add-register-user.component.html',
  styleUrls: ['./add-register-user.component.css']
})
export class AddRegisterUserComponent implements OnInit,OnDestroy,AfterViewInit {

  title="Add Register User"
  dataTableUrl:any="/admin/register-user";
  isIdReadOnlyCheck:boolean=true;
  isReadOnlyCheck:boolean=false;
  isHiddenCheck:boolean=false;
  constructor(
    private snackbar:SnackbarService,
    private service:AuthticationService, 
    private router:Router,
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
  
}