import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/admin/user';
import { AuthticationService } from 'src/app/authentication/authentication.service';
import { LocalStorageService } from 'src/app/common/utility/localStorage.service';
import { RefreshPageService } from 'src/app/common/utility/refreshPage.service ';
import { SnackbarService } from 'src/app/common/utility/snackbar.service';
import { HttpStatus } from 'src/app/constant/enum';
import { PopUpService } from '../pop-up.service';


@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UpdateProfileComponent implements OnInit {
  backUrl='/resumeBuilder';
  action="edit";
  disabledButton=false;
  showSpinner=false;
  sessionUserData:any;
  constructor(
    private router: Router,
    private service:PopUpService,
    private snackbarService:SnackbarService,
    private activatedRoute:ActivatedRoute,
    private  dialogRef: MatDialogRef<UpdateProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private refreshPageService:RefreshPageService,
   ) { }

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

 

  editProfile(){
    if(!this.form.valid){
           return;
    }
    this.disabledButton=true;
    this.showSpinner=true;
    let model =new User();
    model.id=Number(this.form.value.id);
    model.firstName=this.form.value.firstName;
    model.lastName=this.form.value.lastName;
    this.service.updateProfile(model).subscribe((data)=>{
      if(data!=null && data.response!=null && data.status===HttpStatus.SUCCESS){
        this.disabledButton=false;
        this.showSpinner=false;
        this.dialogRef.close({"sessionUserData":data?.response});
        this.snackbarService.openSucessSnackBar(data.message,this.backUrl)
       // this.refreshPageService.refresh();
        location.reload();
      }else{
        this.snackbarService.openErrorSnackBar(data.message)
        this.disabledButton=false;
        this.showSpinner=false;
      }
    })

  }

  getUserDetail(){
      this.form.patchValue({
        "id":this.data?.id,
        "firstName":this.data?.firstName,
        "lastName":this.data?.lastName,
       });
  
    
  }

  goToDepartmentGridPage(){
    this.router.navigate([this.backUrl]);
  }
  
  close(){
    console.log(this.data);
    let sessionUserData:any={};
    sessionUserData['id']=this.data?.id;
    sessionUserData['firstName']=this.data?.firstName;
    sessionUserData['lastName']=this.data?.lastName;
    this.dialogRef.close({'sessionUserData':sessionUserData});
  }
}
