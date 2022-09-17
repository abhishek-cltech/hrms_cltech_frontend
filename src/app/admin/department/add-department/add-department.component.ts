import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthticationService } from 'src/app/authentication/authentication.service';
import { LocalStorageService } from 'src/app/common/utility/localStorage.service';
import { RefreshPageService } from 'src/app/common/utility/refreshPage.service ';
import { SnackbarService } from 'src/app/common/utility/snackbar.service';
import { HttpStatus } from 'src/app/constant/enum';
import { AdminService } from '../../admin.service';
import { Department, User } from '../../user';


@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AddDepartmentComponent implements OnInit {
backUrl='/admin/department';
action="add";
  constructor(
    private router: Router,
    private service:AdminService,
    private snackbarService:SnackbarService,
    private activatedRoute:ActivatedRoute,
    private  dialogRef: MatDialogRef<AddDepartmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private refreshPageService:RefreshPageService,

  ) { 


  }

  ngOnInit(): void {
  }
  departmentForm= new FormGroup({
    id:new FormControl({value:'', disabled: true},[Validators.required]),
    departmentName:new FormControl("",[Validators.required,Validators.minLength(5)]),
    isActive:new FormControl(true,[]),
  }
  )
  goToLoginPage(){
    this.router.navigate(['/login']);
  }

  addDepartment(){
    if(!this.departmentForm.valid){
           return;
    }

    let model =new Department();
    model.departmentName=this.departmentForm.value.departmentName;
    model.active=this.departmentForm.value.isActive;
    this.service.saveDepartment(model).subscribe((data)=>{
      if(data!=null && data.response!=null && data.status===HttpStatus.SUCCESS){
        this.snackbarService.openSucessSnackBar(data.message,this.backUrl)
        this.dialogRef.close({event:this.action,url:this.backUrl});
        this.refreshPageService.refresh();
      }else{
        this.snackbarService.openErrorSnackBar(data.message)
      }
    })

  }

  
  
  close(){
    this.dialogRef.close();
  }
}
