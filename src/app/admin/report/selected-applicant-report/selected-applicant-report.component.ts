import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { HttpStatus } from 'src/app/constant/enum';
@Component({
  selector: 'app-selected-applicant-report',
  templateUrl: './selected-applicant-report.component.html',
  styleUrls: ['./selected-applicant-report.component.css']
})
export class SelectedEmployeeReportComponent implements OnInit{

  backenedUrl = environment.BACKEND_URL;
  dtOptions: any = {};
  title="Selected Applicant Report"
  employees:any;
   displayedColumn:any=[

     { 
      title: 'ID',
      data: 'id',
      name: 'id',
      className: "text-center"
    },
     {
      title: 'Name', 
      data: 'name',
      name: 'name',
      className: "text-center"
     }, 
     {
      title: 'Email',
       data: 'email' ,
       name: 'email',
       className: "text-center"
      },
      {
        title: 'Phone',
         data: 'phone' ,
         name: 'phone',
         className: "text-center"
        },

      {
        title: 'Skill',
         data: 'totalSkill',
         name: 'totalSkill',
         className: "text-center"
         },
     {
      title: 'Total Experience',
       data: 'totalExperience' ,
       name: 'totalExperience',
       className: "text-center"
      },
      {
        title: 'Department',
         data: 'lookingFor' ,
         name: 'lookingFor',
         className: "text-center",
         render: function ( data:any)  { 
            return (data!=null?data:"N.A")
           }
           },
        {
          title: 'Status',
           data: 'resumeStatusCode' ,
           name: 'resumeStatusCode',
           className: "text-center",
           render: function ( data:any)  { 
            return '<div class="status">'+(data!=null?data:"N.A")+'</div>'
           }
           
          },
    
     
    ];
  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.loadDataTable();
  }

  loadDataTable(){
    const that = this;
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: true,
      searchDelay:1500,
      responsive: true,
       autoWidth: false,
      jQueryUI: true,
      displayStart:0,
      lengthMenu: [[10, 25, 50, -1], [10, 25, 50, "All"]],
      order: [[0, 'desc']],
      language: {
        searchPlaceholder: "Search Here"
          },
       ajax: (dataTablesParameters: any, callback:any) => {
        that.http
          .post<any>(
            this.backenedUrl+"employee/getAllSelectedApplicantReport",dataTablesParameters, { }
             ).subscribe((resp:any) => {
              if(resp!=null && resp.response!=null && resp.response.data && resp.status==HttpStatus.SUCCESS  ){
                that.employees = resp.response?.data;
                //Once API fetched data successfully inform datatable by invoking the callback
                 callback({
                   recordsTotal: resp.response.recordsTotal,
                   recordsFiltered: resp.response.recordsFiltered,
                   data:  resp.response.data  // set data
                 });
              }else{
                that.employees = null;
              }
          });
      },
      columns: this.displayedColumn,
       data:this.employees,
      // Declare the use of the extension in the dom parameter
      dom: 'Bfrtip',
      buttons: [
        {
          extend: 'excel',
          text:'Export To Excel',
          title: 'Selected Applicant Report',
        //orientation: 'landscape',
       // pageSize: 'legal', // TABLOID OR LEGAL
        //footer: true,
        filename: function(){
          var d = new Date();
          var n = d.getTime();
          return 'selected-employee-report' + n;
      },
          exportOptions: {
              columns: ':visible'
          }
      },
      {
        extend: 'pdf',
        text: 'Export To PDF',
        title: 'Selected Applicant Report',
        orientation: 'portrait',
       pageSize: 'A3', // TABLOID OR LEGAL
        //footer: true,
        filename: function(){
          var d = new Date();
          var n = d.getTime();
          return 'selected-employee-report' + n;
      },
        exportOptions: {
            columns: ':visible',
            modifier: {
              alignment: 'center',
              
          },
        },
        customize: function (doc:any) {
          doc.content[1].margin = [ 0, 0, 0, 0 ] //left, top, right, bottom
          doc.styles.tableHeader.alignment = 'center';
          //doc.pageMargins = [10,10,10,10];
        doc.defaultStyle.fontSize = 10;
        doc.styles.tableHeader.fontSize = 10;
        doc.styles.title.fontSize = 16;
        doc.styles.tableBodyEven.alignment = 'center';
        doc.styles.tableBodyOdd.alignment = 'center'; 
        doc.content[1].table.widths = Array(doc.content[1].table.body[0].length + 1).join('*').split('');
      }
    },
        {
          extend: 'print',
          title: 'Selected Applicant Report',
          exportOptions: {
              columns: ':visible'
          }
      },
        'colvis',
      ]
    };
  }
  
}   
