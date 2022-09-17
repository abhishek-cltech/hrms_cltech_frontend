import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/common/utility/snackbar.service';
import { HttpStatus } from 'src/app/constant/enum';
import { EmployeeResumeService } from 'src/app/main/shared/employee-resume.service';

@Component({
  selector: 'app-bulkupload',
  templateUrl: './bulkupload.component.html',
  styleUrls: ['./bulkupload.component.css']
})
export class BulkuploadComponent  {
  title="Bulk Applicant"
  dataTableUrl="/admin/applicant";
  @ViewChild("file") file!: ElementRef;
  selectedFile!:File;
  showSpinner=false;
  locked=false;


  constructor(
    private router:Router,
    private employeeService :EmployeeResumeService,
    private snackbar:SnackbarService, 
   
  ) {}

   form=new FormGroup({
    file: new FormControl(null, [Validators.required]),
    })

    onFilechange(event:any){
      if(event.target.files && event.target.files.length) {
        console.log(event.target.files)
        const [file] = event.target.files;
        [this.selectedFile]=event.target.files;
        
       
      }
    }
  backToGrid(){
    this.router.navigate([this.dataTableUrl])
  }

  clear(){
     this.file.nativeElement.fileName="";
     this.showSpinner=false;
     this.locked=false;
     this.form.reset();
  }

  save(){
    if(!this.form.valid){
      return;
    }
    this.showSpinner=true;
    this.locked=true;
    //console.log(this.selectedFile);
    const formData = new FormData();
     formData.append("file",this.selectedFile,this.selectedFile.name);
     this.employeeService.bulkUpload(formData).subscribe((data)=>{
      if(data!=null && data.response!=null && data!=undefined && data.status===HttpStatus.SUCCESS){
        this.showSpinner=false;
        this.locked=false;
        this.snackbar.openSucessSnackBar(data.message,this.dataTableUrl);
        this.router.navigate(["/admin/applicant"]);
      }else{
        this.showSpinner=false;
        this.locked=false;
        this.snackbar.openErrorSnackBar(data.message)

      }
     })
  }
}
