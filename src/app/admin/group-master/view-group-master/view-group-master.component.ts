import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators } from '@angular/forms';
import { SnackbarService } from 'src/app/common/utility/snackbar.service';
import { HttpStatus } from 'src/app/constant/enum';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupMasterService } from '../shared/group-master.service';

@Component({
  selector: 'app-view-group-master',
  templateUrl: './view-group-master.component.html',
  styleUrls: ['./view-group-master.component.css']
})
export class ViewGroupMasterComponent implements OnInit {
  title="View Group Master"
  dataTableUrl:any="/admin/group-master";
  
  constructor(
    private snackbar:SnackbarService, 
    private router:Router,
    private service:GroupMasterService,
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
         this.form.disable();
         
        }else{
          this.snackbar.openErrorSnackBar(data.message)
        }
       })
    }))
  }
}