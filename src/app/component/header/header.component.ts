import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/admin/user';
import { AuthticationService } from 'src/app/authentication/authentication.service';
import { LocalStorageService } from 'src/app/common/utility/localStorage.service';
import { RefreshPageService } from 'src/app/common/utility/refreshPage.service ';
import { SnackbarService } from 'src/app/common/utility/snackbar.service';
import { HttpStatus } from 'src/app/constant/enum';
import { UpdateProfileComponent } from 'src/app/pop-up/update-profile/update-profile.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit ,OnDestroy {

  isLoggedin:boolean=false;
  removeHeader:boolean=false;
  $sub!: Subscription;
  sessionUser:any="admin";
  sessionUserData!: User;
  profileName:any="Guest" 
  constructor(
    private service:AuthticationService,
    private refreshPage: RefreshPageService,
    private authService:AuthticationService,
    private snackbarService:SnackbarService,
    private activatedRoute:ActivatedRoute,
    private localStorageService:LocalStorageService,
    public dialog: MatDialog,
    ) { 
      
    }
 
  ngOnInit(): void {
    this.$sub=this.service.recieveHeaderVisibilityStatus().subscribe((data)=>{
      this.removeHeader=data;
    })
    this.isUserLogedin();
    this.findSessionUser();
  }
   isUserLogedin(){
    console.log(this.isLoggedin)
      this.isLoggedin=this.service.isUserLoggedIn();
   }

   handleLogout(){
    this.service.logout();
   // location.reload();
   }
   ngOnDestroy(): void {
    this.$sub.unsubscribe();
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

  openProfileDialog(){
    const{id,firstName,lastName}=this.sessionUserData
    const dialogRef = this.dialog.open(UpdateProfileComponent, {
      data: {id:id, firstName:firstName,lastName:lastName,title:"Edit Profile",},
      disableClose:true
    });

    dialogRef.afterClosed().subscribe(result => {
     if(result!=null && result!=undefined){
      console.log(result)
      this.profileName=result?.sessionUserData?.firstName +" "+result?.sessionUserData?.lastName
     }
     
    });
  }

  }


