import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { data } from 'jquery';
import { ForgetServiceService } from '../authentication/forget-service.service';
import { CustomValidators } from '../common/customValidators/validator';
import { HttpStatus } from '../constant/enum';
import { SnackbarService } from 'src/app/common/utility/snackbar.service';
import { RefreshPageService } from '../common/utility/refreshPage.service ';
import { User } from '../admin/user';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {

backUrl='/login';
title='Forgot password'
showPassword:boolean=false;
showConfirmPassword:boolean=false;
userVerified:boolean=false;
btnVerified:boolean=true;
securityQuestions:any;
firstName: any;
lastName: any;
  constructor(
    private router: Router,
    private service: ForgetServiceService,    
    private snackbarService:SnackbarService,    
    private refreshPageService:RefreshPageService,
    
  ) { }

  ngOnInit(): void {
    this.getSecurityQuestions();
  }

  form= new FormGroup({
    id:new FormControl(""),
    email:new FormControl('',[Validators.required,Validators.email]),
    securityQuestion: new FormControl("",[Validators.required]),
    securityAnswer: new FormControl("",[Validators.required,Validators.minLength(3)]),
    password:new FormControl("",[Validators.required,Validators.minLength(8)]),
    confirmPassword:new FormControl("",[Validators.required]),

  },  CustomValidators.passwordMatch('password', 'confirmPassword') 
  )
  verifyMail(){
    
    let model =new User();
    model.email=this.form.value.email;
    model.questionCode= this.form.value.securityQuestion;
    model.questionAnswer= this.form.value.securityAnswer;
    this.service.checkMail(model).subscribe((data)=>{
      if(data.status===HttpStatus.SUCCESS){
      this.btnVerified = false;
      this.userVerified = true;
        console.log(data.response['id']);
      this.form.patchValue({
        "id":data.response['id']
       });
       this.firstName=data.response['firstName'];
       this.lastName=data.response['lastName'];
      this.snackbarService.openSucessSnackBar("Email Verified Successfully !","/forgotPassword")
    }else{
      this.snackbarService.openErrorSnackBar("Email Verfication Failed !")
    }
    })
  }
  

  toggleVisibilityOfPassword(){
    this.showPassword=!this.showPassword;
  }

  toggleVisibilityOfConfirmPassword(){
    this.showConfirmPassword=!this.showConfirmPassword;
  }

  save(){    
    if(!this.form.valid){
      return;
    }
      let model= new User;
      model.id = Number(this.form.value.id);
      model.email = this.form.value.email;
      model.password = this.form.value.password;
      model.confirmPassword = this.form.value.confirmPassword;
      this.service.updatePassword(model).subscribe((data:any)=>{
        if(data.status===HttpStatus.SUCCESS){
          this.snackbarService.openSucessSnackBar(data.message,"/login");
        }else{
          this.snackbarService.openErrorSnackBar(data.message);
        }
      })    
  }
 
  getSecurityQuestions(){
    this.service.getSecurityQuestions().subscribe((data)=>{
      if(data!=null && data.response!=null && data.status===HttpStatus.SUCCESS){
        this.securityQuestions = data.response;
        console.log(this.securityQuestions);
      }else{
        this.snackbarService.openErrorSnackBar(data.message)
      }
    })
  }

  back(){
    this.router.navigate(["/login"]);
  }
}
