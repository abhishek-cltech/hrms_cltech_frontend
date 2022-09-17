import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthticationService } from 'src/app/authentication/authentication.service';
import { LocalStorageService } from 'src/app/common/utility/localStorage.service';
import { RefreshPageService } from 'src/app/common/utility/refreshPage.service ';
import { SnackbarService } from 'src/app/common/utility/snackbar.service';
import { HttpStatus } from 'src/app/constant/enum';
import { AdminService } from './admin.service';
import { User } from './user';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
backUrl='/admin';
action="add";
sessionUser:any="admin";
sessionUserData!: User;
profileName:any="Admin"


  constructor(
    private router: Router,
    private service:AdminService,
    private authService:AuthticationService,
    private snackbarService:SnackbarService,
    private activatedRoute:ActivatedRoute,
    private localStorageService:LocalStorageService,

  ) { 


  }

  logout(){
    this.authService.logout();
  }

  ngOnInit(): void {
    this.findSessionUser();
  }

  findSessionUser(){
    this.authService.findSessionUser(this.localStorageService.getLocalStorage("USER_NAME_SESSION_ATTRIBUTE_NAME")).subscribe((data)=>{
      if(data!=null && data.response!=null && data.status==HttpStatus.SUCCESS){
         this.sessionUserData=data.response;
         this.profileName=data?.response?.firstName +" "+data?.response?.lastName
        // this.service.braodCastId.next(this.sessionUser);  
      }else{

      }
    })
  }
  navigateToProfile(){
    const{id,firstName,lastName}=this.sessionUserData
    this.router.navigate(['/admin/profile/edit-profile'],{queryParams:{id:id,firstName:firstName,lastName:lastName},skipLocationChange:true})
  }
 
}
