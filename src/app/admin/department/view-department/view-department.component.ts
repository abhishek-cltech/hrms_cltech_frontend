import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthticationService } from 'src/app/authentication/authentication.service';
import { LocalStorageService } from 'src/app/common/utility/localStorage.service';
import { SnackbarService } from 'src/app/common/utility/snackbar.service';
import { HttpStatus } from 'src/app/constant/enum';
import { AdminService } from '../../admin.service';
import { User } from '../../user';


@Component({
  selector: 'app-view-department',
  templateUrl: './view-department.component.html',
  styleUrls: ['./view-department.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ViewDepartmentComponent implements OnInit {
  backUrl='/admin/department';
  constructor(
    private router: Router,
    private service:AdminService,
    private snackbarService:SnackbarService,
    private activatedRoute:ActivatedRoute,
    private  dialogRef: MatDialogRef<ViewDepartmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,

  ) { 


  }

  ngOnInit(): void {
  this.getUserDetail();

  }
  departmentForm= new FormGroup({
    id:new FormControl({value:'', disabled: true},[Validators.required]),
    departmentName:new FormControl("",[Validators.required,Validators.minLength(5)]),
    isActive:new FormControl(true,[]),
  }
  )
  
  goToDepartmentGridPage(){
    this.router.navigate([this.backUrl]);
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
       this.departmentForm.disable();
      }else{
        this.snackbarService.openErrorSnackBar(data.message)
      }
     })
  }
  
  close(){
    this.dialogRef.close();
  }
}
