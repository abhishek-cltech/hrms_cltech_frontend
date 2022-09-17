import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SnackbarService } from 'src/app/common/utility/snackbar.service';
import { HttpStatus } from 'src/app/constant/enum';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomValidators } from 'src/app/common/customValidators/validator';
import { User } from '../../user';
import { AuthticationService } from 'src/app/authentication/authentication.service';
import { AdminService } from '../../admin.service';
import { GroupMasterService } from '../shared/group-master.service';
import { GroupMaster } from '../shared/group-master.model';

@Component({
  selector: 'app-edit-group-master',
  templateUrl: './edit-group-master.component.html',
  styleUrls: ['./edit-group-master.component.css']
})
export class EditGroupMasterComponent implements OnInit {
  title="Edit Group Master"
  dataTableUrl:any="/admin/group-master";
  
  constructor(
    private snackbar:SnackbarService, 
    private service:GroupMasterService, 
    private router:Router,
    private activatedRoute:ActivatedRoute
  ) { 
     
  }
  form= new FormGroup({
    id:new FormControl(""),
    groupName:new FormControl("",[Validators.required]),
    code:new FormControl("",[Validators.required]),
    value:new FormControl("",[Validators.required]),
    active:new FormControl(true,[]),
})
  ngOnInit(): void {
    this.getDetail();
  }
  ngAfterViewInit(): void {     
  }
  ngOnDestroy(): void
  {
  }

  backToGrid(){
    this.router.navigate([this.dataTableUrl]);
  }

  save(){
    if(!this.form.valid){
      return;
}

let model =new GroupMaster();
model.id=Number(this.form.value.id)
model.groupName=this.form.value.groupName;
model.code=this.form.value.code;
model.value=this.form.value.value;
model.active=this.form.value.active;
this.service.updateGroupMaster(model).subscribe((data)=>{
 if(data!=null && data.response!=null && data.status===HttpStatus.SUCCESS){
   this.snackbar.openSucessSnackBar(data.message,this.dataTableUrl);
 }else{
   this.snackbar.openErrorSnackBar(data.message)
 }
})
}

getDetail(){
  this.activatedRoute.queryParams.subscribe((params=>{
    const id=params['param'];
    this.service.getGroupMasterById(id).subscribe((data:any)=>{
      if(data!=null && data.response!=null && data.status==HttpStatus.SUCCESS){
        this.form.patchValue({
          "id":data.response.id,
          "groupName":data.response.groupName,
          "code":data.response.code,
          "value":data.response.value,
          "active":data.response.active,
         });
       
      }else{
        this.snackbar.openErrorSnackBar(data.message)
      }
     })
  }))
}
}