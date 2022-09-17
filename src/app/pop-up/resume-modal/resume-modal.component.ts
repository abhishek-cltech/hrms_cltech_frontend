import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import jsPDF from 'jspdf';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
declare var require: any;
const htmlToPdfmake = require("html-to-pdfmake");
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;
import html2canvas from 'html2canvas';
import { EmployeeResumeService } from 'src/app/main/shared/employee-resume.service';
import { HttpStatus } from 'src/app/constant/enum';
import { EmployeeResume } from 'src/app/main/shared/employee-resume';
import { SnackbarService } from 'src/app/common/utility/snackbar.service';
declare var html2pdf: any;

@Component({
  selector: 'app-resume-modal',
  templateUrl: './resume-modal.component.html',
  styleUrls: ['./resume-modal.component.css']
})
export class ResumeModalComponent implements OnInit {
  @ViewChild('resumePdf',{static:false})
  resumePdf!: ElementRef;
  fileName="resume";
  employee !:any;
  hideEmployeeDetail:boolean=false;
  constructor(
    private dialogRef: MatDialogRef<ResumeModalComponent>,
    @Inject(MAT_DIALOG_DATA) public  data: any,
    private employeeService :EmployeeResumeService,
    private snackbar:SnackbarService,
    ) { }

  ngOnInit(): void {
    this.getDetail();
  }

  getDate(){
    return new Date()
  }
  getDetail(){
      this.employeeService.getEmployeeById(this.data?.id).subscribe((data)=>{
        if(data!=null && data!=undefined && data.response!=null && data.status==HttpStatus.SUCCESS){
           this.employee=data.response;
           let time=this.getDate().getTime();
           this.fileName=data.response.employeeDetail.firstName;
           data.response?.posts.forEach((post:any)=>{
            this.fileName +="-"+ post.departmentName.split(' ')[0]
           })
           this.fileName+="-"+time;
         
        }else{
          this.snackbar.openErrorSnackBar(data.message);
        }
      
    })
   }


  confirm(){
    const result={
      'isConfirm':true
    }
    this.dialogRef.close(result)
  }
close() {
    this.dialogRef.close();
}

download(){
  const doc = new jsPDF();
  const resumePdf = this.resumePdf.nativeElement;
  console.log(resumePdf)
   var html= htmlToPdfmake(resumePdf.innerHTML);
   const documentDefinition:any = {
     content: html ,
      //pageSize:'A5',
      //pageOrientation: 'potrait',
    };
    pdfMake.createPdf(documentDefinition).download("abrarreusme"); 
}

print(){
  console.log("printing/..")
  const doc = new jsPDF();
  const resumePdf = this.resumePdf.nativeElement;
  console.log(resumePdf)
   var html= htmlToPdfmake(resumePdf.innerHTML);
   const documentDefinition:any = {
     content: html ,
      //pageSize:'A5',
      //pageOrientation: 'potrait',
    };
    pdfMake.createPdf(documentDefinition).print(); 
}



openPDF(): void {
  let DATA: any = document.getElementById('resumePdf');
  html2canvas(DATA).then((canvas) => {
    let fileWidth = 208;
    let fileHeight = (canvas.height * fileWidth) / canvas.width;
    const FILEURI = canvas.toDataURL('image/png');
    let PDF = new jsPDF('p', 'mm', 'a4');
    let position = 0;
    PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
    PDF.save(this.fileName+'.pdf');
  });
}

downloadAsDocx() {
  var header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' " +
    "xmlns:w='urn:schemas-microsoft-com:office:word' " +
    "xmlns='http://www.w3.org/TR/REC-html40'>" +
    "<head><meta charset='utf-8'></head><body>";
  var footer = "</body></html>";
  const resumePdf = document.getElementById("resumePdf")?.innerHTML;
  var sourceHTML = header + resumePdf + footer;

  var source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
  var fileDownload = document.createElement("a");
  document.body.appendChild(fileDownload);
  fileDownload.href = source;
  fileDownload.download = this.fileName+'.doc';
  fileDownload.click();
  document.body.removeChild(fileDownload);
}

hideContactDetail(hideDetail:boolean){
  if(hideDetail){
    this.hideEmployeeDetail=hideDetail;
  }else{
    this.hideEmployeeDetail=hideDetail;
  }
}

}




