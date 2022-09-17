import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators } from '@angular/forms';
import { SnackbarService } from 'src/app/common/utility/snackbar.service';
import { HttpStatus } from 'src/app/constant/enum';
import { CustomValidators } from 'src/app/common/customValidators/validator';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-view-register-user',
  templateUrl: './view-register-user.component.html',
  styleUrls: ['./view-register-user.component.css']
})
export class ViewRegisterUserComponent implements OnInit {
  title="View Register User"
  dataTableUrl:any="/admin/register-user";
  isIdReadOnlyCheck:boolean=true;
  isReadOnlyCheck:boolean=true;
  isHiddenCheck:boolean=false;
  
  constructor(
    private snackbar:SnackbarService, 
    private router:Router,
    private adminService:AdminService,
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

  getUserDetail(){
    this.activatedRoute.queryParams.subscribe((params=>{
      const id=params['param'];
      this.adminService.getUserById(id).subscribe((data:any)=>{
        if(data!=null && data.response!=null && data.status==HttpStatus.SUCCESS){
         this.form.patchValue({
          "id":data.response.id,
          "firstName":data.response.firstName,
          "lastName":data.response.lastName,
          "roleId":data.response.roleId,
          "email":data.response.email,
          "isActive":data.response.active,
         });
         this.form.disable();
        }else{
          this.snackbar.openErrorSnackBar(data.message)
        }
       })
    }))
  }
}