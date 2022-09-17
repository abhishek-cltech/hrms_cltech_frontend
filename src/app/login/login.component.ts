import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthticationService } from '../authentication/authentication.service';
import { UserModel } from '../authentication/userModel';
import { LocalStorageService } from '../common/utility/localStorage.service';
import { SnackbarService } from '../common/utility/snackbar.service';
import { HttpStatus } from '../constant/enum';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  backUrl='/resumeBuilder';
  USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'
  isLoggedin:boolean=false;
  showPassword:boolean=false;
  constructor(
    private router:Router,
    private service:AuthticationService,
    private snackbarService:SnackbarService,
    private localStorageService:LocalStorageService
    ) { }
    
    loginForm= new FormGroup({
      email:new FormControl('',[Validators.required,Validators.email]),
      password:new FormControl('',[Validators.required,]),
      //role:new FormControl('',[Validators.required])
    })
  ngOnInit(): void {
   this.isUserLogedin();
   
  }
  toggleVisibilityOfPassword(){
    this.showPassword=!this.showPassword;
  }
   
  signIn(){
    if(!this.loginForm.valid){
      return;
}

let model =new UserModel();
model.email=this.loginForm.value.email;
model.username=this.loginForm.value.email;
model.password=this.loginForm.value.password;

this.service.login(model).subscribe((data)=>{
  if(data!=null && data.response!=null && data?.response?.returnUrl && data.status===HttpStatus.SUCCESS){
    this.localStorageService.setLocalStorage('USER_NAME_SESSION_ATTRIBUTE_NAME',data.response.email)
    if(data?.response?.returnUrl==environment.ADMIN_URL){
      this.service.sendHeaderVisibilityStatus(true);
    }
    this.snackbarService.openSucessSnackBar(data.message,data?.response?.returnUrl)
    this.router.navigateByUrl(data?.response?.returnUrl);
  }else{
    this.snackbarService.openErrorSnackBar(data.message)
  }
})
  }
  goToRegistrationPage(){
    this.router.navigate(['/registration'])
  }

  isUserLogedin(){
   // this.isLoggedin=this.service.isUserLoggedIn();
    if(this.localStorageService.getLocalStorage("USER_NAME_SESSION_ATTRIBUTE_NAME")!==undefined ){
         this.router.navigate(['/resumeBuilder'])
     }else{
      return;
     }
 }
 isForgotPassword(){
  this.router.navigate(["/forgotPassword"])
 }
  
}
