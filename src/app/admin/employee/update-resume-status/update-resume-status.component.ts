import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { RefreshPageService } from 'src/app/common/utility/refreshPage.service ';
import { SnackbarService } from 'src/app/common/utility/snackbar.service';
import { EmployeeResume } from 'src/app/main/shared/employee-resume';
import { AdminService } from '../../admin.service';


@Component({
  selector: 'app-update-resume-status',
  templateUrl: './update-resume-status.component.html',
  styleUrls: ['./update-resume-status.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UpdateResumeStatusPopUp implements OnInit {
backUrl='/admin/department';
action="add";
  constructor(
    private router: Router,
    private service:AdminService,
    private snackbarService:SnackbarService,
    private activatedRoute:ActivatedRoute,
    private  dialogRef: MatDialogRef<UpdateResumeStatusPopUp>,
    @Inject(MAT_DIALOG_DATA) public data: any,

  ) { 


  }

  ngOnInit(): void {
    this.getDetail();
  }
  form=new FormGroup({
    resumeStatusCode:new FormControl("",[Validators.required]),
  }
  )
  save(){
    if(!this.form.valid){
           return;
    }
    let model =new EmployeeResume();
    model.id=Number(this.data.id);
    model.resumeStatusCode=this.form.value.resumeStatusCode;
    // Send data to the parent component
    this.dialogRef.close(model); 
  }

  getDetail(){
   this.form.patchValue({
    'resumeStatusCode':this.data?.resumeStatusCode
   })
 } 
  
  close(){
    this.dialogRef.close(undefined);
  }
}
