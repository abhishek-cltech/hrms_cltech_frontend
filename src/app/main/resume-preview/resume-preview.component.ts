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
import { ActivatedRoute, Router } from '@angular/router';
declare var html2pdf: any;

@Component({
  selector: 'app-resume-preview-modal',
  templateUrl: './resume-preview.component.html',
  styleUrls: ['./resume-preview.component.css']
})
export class ResumePreviewComponent implements OnInit {
  @ViewChild('resumePdf', { static: false })
  resumePdf!: ElementRef;
  dataTableUrl: any = "/resumeBuilder";
  employee !: any;
  hideEmployeeDetail: boolean = false;
  constructor(

    private employeeService: EmployeeResumeService,
    private snackbar: SnackbarService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getDetail();
  }

  getDate() {
    return new Date()
  }


  getDetail() {
    this.activatedRoute.queryParams.subscribe((params) => {
      const id = params['param'];
      this.employeeService.getEmployeeById(id).subscribe((data) => {
        if (data != null && data != undefined && data.response != null && data.status == HttpStatus.SUCCESS) {
          this.employee = data.response;
        } else {
          this.snackbar.openErrorSnackBar(data.message);
        }
      })
    })
  }


  close() {
    this.router.navigate([this.dataTableUrl]);
  }
  backToGrid() {
    this.router.navigate([this.dataTableUrl]);
  }
  download() {
    const doc = new jsPDF();
    doc.setFontSize(3);
    const resumePdf = this.resumePdf.nativeElement;
    console.log(resumePdf)
    var html = htmlToPdfmake(resumePdf.innerHTML);
    const documentDefinition: any = {
      content: html,
      pageSize: 'A4',
      pageOrientation: 'portrait',

    };
    pdfMake.createPdf(documentDefinition).download("abrarreusme");
  }

  print() {
    console.log("printing/..")
    const doc = new jsPDF();
    const resumePdf = this.resumePdf.nativeElement;
    console.log(resumePdf)
    var html = htmlToPdfmake(resumePdf.innerHTML);
    const documentDefinition: any = {
      content: html,
      pageSize:'A4',
      pageOrientation: 'potrait',
    };
    pdfMake.createPdf(documentDefinition).print();
  }

  downloadAsPdf() {
    const doc = new jsPDF("portrait", "mm", "A3");
    const resumePdf = $("#resumePdf").html;
    var opt = {
      margin: 1,
      filename: 'output.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'A3', orientation: 'portrait' }
    };
    // New Promise-based usage:
    html2pdf().from(resumePdf).set(opt).save();
  }

  hideContactDetail(hideDetail: boolean) {
    if (hideDetail) {
      this.hideEmployeeDetail = hideDetail;
    } else {
      this.hideEmployeeDetail = hideDetail;
    }
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
    fileDownload.download = 'document.doc';
    fileDownload.click();
    document.body.removeChild(fileDownload);
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
      PDF.save('resume.pdf');
    });
  }
  converHTMLFileToPDF() {
    
   //let htmlData=document.querySelector('#resumePdf');
   let htmlData=this.resumePdf.nativeElement;
       let options : any = {
         orientation: 'p',
         unit: 'pt',
         format: 'a4',
         };
   
  
    // Convert HTML to PDF in JavaScript
    let doc = new jsPDF(options);
    doc.html(htmlData.innerHTML, {
     callback: function (doc) {
           doc.save("angular-demo.pdf");
         },
    //  margin:15,
    //  x: 10,
    //  y: 10
   });
  }
}







