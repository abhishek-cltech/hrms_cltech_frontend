import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthticationService } from 'src/app/authentication/authentication.service';
import { UserModel } from 'src/app/authentication/userModel';
import { LocalStorageService } from 'src/app/common/utility/localStorage.service';
import { RefreshPageService } from 'src/app/common/utility/refreshPage.service ';
import { SnackbarService } from 'src/app/common/utility/snackbar.service';
import { HttpStatus } from 'src/app/constant/enum';
import { AdminService } from '../../admin.service';
import { Department, User } from '../../user';


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
  //encapsulation: ViewEncapsulation.None
})
export class EditProfileComponent implements OnInit {
  backUrl='/admin';
  title="Edit Profile";
  resetPasswordUrl="/admin/profile/reset-password"
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
    id:new FormControl(''),
    firstName:new FormControl("",[Validators.required,Validators.minLength(3)]),
    lastName:new FormControl("",[Validators.required,Validators.minLength(3)]),
  }
  )
  goToLoginPage(){
    this.router.navigate(['/login']);
  }

  save(){
    if(!this.form.valid){
           return;
    }
    let model =new User();
    model.id=Number(this.form.value.id);
    model.firstName=this.form.value.firstName;
    model.lastName=this.form.value.lastName;
    console.log(model)
    this.service.updateProfile(model).subscribe((data)=>{
      if(data!=null && data.response!=null && data.status===HttpStatus.SUCCESS){
        this.snackbarService.openSucessSnackBar(data.message,this.backUrl)
        this.refreshPageService.refresh();
      }else{
        this.snackbarService.openErrorSnackBar(data.message)
      }
    })

  }

  getUserDetail(){
    this.activatedRoute.queryParams.subscribe((params)=>{
      this.form.patchValue({
        "id":params['id'],
        "firstName":params['firstName'],
        "lastName":params['lastName'],
       });
    })
    
  }

  navigateToResetPasswordPage(){
    this.router.navigate([this.resetPasswordUrl],{queryParams:{id:this.form.value.id},skipLocationChange:true});
  }
  
 
}
