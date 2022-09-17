import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthticationService } from 'src/app/authentication/authentication.service';
import { CustomValidators } from 'src/app/common/customValidators/validator';
import { LocalStorageService } from 'src/app/common/utility/localStorage.service';
import { RefreshPageService } from 'src/app/common/utility/refreshPage.service ';
import { SnackbarService } from 'src/app/common/utility/snackbar.service';
import { HttpStatus } from 'src/app/constant/enum';
import { AdminService } from '../../admin.service';
import { User } from '../../user';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
  // encapsulation: ViewEncapsulation.None
})
export class ResetPasswordComponent implements OnInit {
backUrl='/admin';
title='Reset password'
showPassword:boolean=false;
  showConfirmPassword:boolean=false;
  constructor(
    private router: Router,
    private service:AdminService,
    private snackbarService:SnackbarService,
    private activatedRoute:ActivatedRoute,
    private refreshPageService:RefreshPageService,
  ) { 


  }

  ngOnInit(): void {
    this.getUserDetail();
  }
  form= new FormGroup({
    id:new FormControl(""),
    password:new FormControl("",[Validators.required,Validators.minLength(8)]),
    confirmPassword:new FormControl("",[Validators.required]),
  },  CustomValidators.passwordMatch('password', 'confirmPassword') 
  )
  goToLoginPage(){
    this.router.navigate(['/login']);
  }

  getUserDetail(){
    this.activatedRoute.queryParams.subscribe((params)=>{
      this.form.patchValue({
         'id':params['id'],
       });
    })
    
  }
  save(){
    if(!this.form.valid){
           return;
    }

    let model =new User();
    model.id=Number(this.form.value.id);
    model.password=this.form.value.password;
    model.confirmPassword=this.form.value.confirmPassword;
    this.service.resetPassword(model).subscribe((data)=>{
      if(data!=null && data.response!=null && data.status===HttpStatus.SUCCESS){
        this.snackbarService.openSucessSnackBar(data.message,this.backUrl)
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
  
}
