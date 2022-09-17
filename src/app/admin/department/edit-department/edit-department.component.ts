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
  selector: 'app-edit-department',
  templateUrl: './edit-department.component.html',
  styleUrls: ['./edit-department.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class EditDepartmentComponent implements OnInit {
  backUrl='/admin/department';
  action="edit";
  constructor(
    private router: Router,
    private service:AdminService,
    private snackbarService:SnackbarService,
    private activatedRoute:ActivatedRoute,
    private  dialogRef: MatDialogRef<EditDepartmentComponent>,
    private refreshPageService:RefreshPageService,
    @Inject(MAT_DIALOG_DATA) public data: any,

  ) { 


  }

  ngOnInit(): void {
  this.getUserDetail();

  }
  departmentForm= new FormGroup({
    id:new FormControl('',[Validators.required]),
    departmentName:new FormControl("",[Validators.required,Validators.minLength(5)]),
    isActive:new FormControl(true,[]),
  }
  )
  goToLoginPage(){
    this.router.navigate(['/login']);
  }

  editDepartment(){
    if(!this.departmentForm.valid){
           return;
    }

    let model =new Department();
    model.id=Number(this.departmentForm.value.id);
    model.departmentName=this.departmentForm.value.departmentName;
    model.active=this.departmentForm.value.isActive;
    console.log(model)
    this.service.updateDepartment(model).subscribe((data)=>{
      if(data!=null && data.response!=null && data.status===HttpStatus.SUCCESS){
        this.snackbarService.openSucessSnackBar(data.message,this.backUrl)
        this.dialogRef.close({event:this.action,url:this.backUrl});
        this.refreshPageService.refresh();
      }else{
        this.snackbarService.openErrorSnackBar(data.message)
      }
    })

  }

  getUserDetail(){
    let id=this.data.id;
    this.service.getDepartmentById(id).subscribe((data:any)=>{
      if(data!=null && data.response!=null && data.status==HttpStatus.SUCCESS){
       this.departmentForm.patchValue({
        "id":data.response.id,
        "departmentName":data.response.departmentName,
        "isActive":data.response.active,
       });
      }else{
        this.snackbarService.openErrorSnackBar(data.message)
      }
     })
  }

  goToDepartmentGridPage(){
    this.router.navigate([this.backUrl]);
  }
  
  close(){
    this.dialogRef.close();
  }
}
