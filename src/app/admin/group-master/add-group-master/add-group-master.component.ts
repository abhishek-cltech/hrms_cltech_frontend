import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SnackbarService } from 'src/app/common/utility/snackbar.service';
import { HttpStatus } from 'src/app/constant/enum';
import { Router } from '@angular/router';
import { AuthticationService } from 'src/app/authentication/authentication.service';
import { GroupMaster } from '../shared/group-master.model';
import { GroupMasterService } from '../shared/group-master.service';

@Component({
  selector: 'app-add-group-master',
  templateUrl: './add-group-master.component.html',
  styleUrls: ['./add-group-master.component.css']
})
export class AddGroupMasterComponent implements OnInit,OnDestroy,AfterViewInit {

  title="Add Group Master"
  dataTableUrl:any="/admin/group-master";
  
  constructor(
    private snackbar:SnackbarService,
    private service:GroupMasterService, 
    private router:Router,
  ) { 
     
  }
  form= new FormGroup({
    id:new FormControl(""),
    groupName:new FormControl("",[Validators.required]),
    code:new FormControl("",[Validators.required]),
    value:new FormControl("",[Validators.required]),
    active:new FormControl(true,[]),
  }
  )
  ngOnInit(): void {
    
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
model.groupName=this.form.value.groupName;
model.code=this.form.value.code;
model.value=this.form.value.value;
model.active=this.form.value.active;
this.service.saveGroupMaster(model).subscribe((data)=>{
 if(data!=null && data.response!=null && data.status===HttpStatus.SUCCESS){
   this.snackbar.openSucessSnackBar(data.message,this.dataTableUrl);
 }else{
   this.snackbar.openErrorSnackBar(data.message)
 }
})
}
  
}