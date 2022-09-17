import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { jqxGridComponent } from 'jqwidgets-ng/jqxgrid';
import { JqxGridService } from 'src/app/common/utility/jqxgrid.service ';
import { RequestMethod } from 'src/app/constant/enum';

@Component({
  selector: 'app-employee-table',
  templateUrl: './employee-table.component.html',
  styleUrls: ['./employee-table.component.css']
})

export class EmployeeTableComponent implements OnInit {
  @ViewChild('jqxGrid', { static: true }) myGrid!: jqxGridComponent;
 //@ViewChild('jqxGrid') myGrid!: jqxGridComponent;
  url = "http://localhost:8082/cltech/employee/getAllEmployee";
  width: string = '100%';
  totalrecords!: number;
  counter: number = 1;
  constructor( 
    private router: Router,
    private jqxGridService :JqxGridService,
    
    ) { }
  ngOnInit(): void {
    
  }
  getWidth(): any {
    if (document.body.offsetWidth < 850) {
      return '90%';
    }

    return 850;
  }
  columns: any[] =
  [
      { text: 'Id', datafield: 'id1',  filterable: true, sortable: true, width: "10%" },
     // { text: 'First Name', datafield: 'firstName',  filterable: true, sortable: true, width: "15%" },
      //{ text: 'Last Name', datafield: 'lastName', filterable: true, sortable: true,  width: "15%"  },
      { text: 'Name', datafield: 'employeeDetail',  filterable: true, sortable: true, width: "15%" ,
      cellsrenderer: function (row: any, column: any, value: any, rowData: any, setting: any, rowObject: any) {
        if(rowObject.employeeDetail!=null){
          var employeeName=rowObject.employeeDetail.firstName+" "+rowObject.employeeDetail.lastName;
          return "<div style='margin-top:13px;padding-left:7px;!important'>"+employeeName+"</div>";
        }
        return "";
      
     },
    },
      { text: 'Email', datafield: 'email',  filterable: true, sortable: true,  width: "20%" ,
      cellsrenderer: function (row: any, column: any, value: any, rowData: any, setting: any, rowObject: any) {
        if(rowObject.employeeDetail!=null){
          var email=rowObject.employeeDetail.email;
          return "<div style='margin-top:13px;padding-left:7px;!important'>"+email+"</div>";
        }
        return "";
      
     }, },
      { text: 'Skill', datafield: 'skill',  filterable: true, sortable: true, width: "20%"  },
      { text: 'Phone', datafield: 'phone',  filterable: true, sortable: true,  width: "15%" ,
      cellsrenderer: function (row: any, column: any, value: any, rowData: any, setting: any, rowObject: any) {
        if(rowObject.employeeDetail!=null){
          var phone=rowObject.employeeDetail.phone;
          return "<div style='margin-top:13px;padding-left:7px;!important'>"+phone+"</div>";
        }
        return "";
      
     }, },
      { text: 'Fresher', datafield: 'fresher',  filterable: true, sortable: true, width: "10%"
    //   ,cellsrenderer: function (row: any, column: any, value: any, rowData: any, setting: any, rowObject: any) {
    //     if(rowObject.employeeDetail!=null){
    //       var fresher=rowObject.working?"Yes":"No";
    //       return "<div style='margin-top:13px;padding-left:15px;!important'>"+fresher+"</div>";
    //     }
    //     return "";
      
    //  },
    
    },
      { text: 'Working', datafield: 'working',  filterable: true, sortable: true, width: "10%" 
    //  , cellsrenderer: function (row: any, column: any, value: any, rowData: any, setting: any, rowObject: any) {
    //     if(rowObject.employeeDetail!=null){
    //       var phone=rowObject.working?"Yes":"No";
    //       return "<div style='margin-top:13px;padding-left:15px;!important'>"+phone+"</div>";
    //     }
    //     return "";
      
    //  },
    
    },
    { text: 'Action', datafield: 'id',  width: "15%" , filterable: false, sortable: false,
    createwidget: (row: any, column: any, value: string, htmlElement: HTMLElement): void => {
      const currentObj = this;
      console.log(column)
      const viewButton = this.jqxGridService.setActionButton(
        'action-btn-view' + this.counter, 
        '<i class="vp-grid-action-btn btn-pointer pr-4" action="view" title="View Group Master" value="'+row.bounddata.id+'" class="fa-solid fa-eye" style="cursor:pointer;">view</i>',
        htmlElement
      );
      viewButton.addEventHandler('click', function (event: any): void {
        console.log(row)
       // const currentButtonValue = (<HTMLElement>)this.children[1].innerHTML;
         //currentObj.actionCallback(this.children[1].children[0].getAttribute('action'), this.children[1].children[0].getAttribute('value'));
      });
      this.counter++;
  },
  initwidget: (row: number, column: any, value: any, htmlElement: HTMLElement): void => { 
    let eleArr = htmlElement.querySelectorAll('.vp-grid-action-btn');
    
    // eleArr.forEach(element => {
    //   element.setAttribute('value',value);
    //  // console.log(element)
    // });
  }
  }
  ]
  source: any = {
    url: this.url,
    type: RequestMethod.POST,
    datatype: "json",
    contenttype: "application/json; charset=UTF-8",
    sortcolumn: 'id',
    datafields: [
      { name: 'id', map: 'id', type: 'number' },
      { name: 'id1', map: 'id', type: 'number' },
      { name: 'name', map: 'employeeDetail.firstName' },
      { name: 'email', map: 'employeeDetail.email', type: 'string' },
      { name: 'skill', map: 'totalSkill', type: 'string' },
      { name: 'phone', map: 'employeeDetail.phone', type: 'string' },
      { name: 'fresher', map: 'fresher' },
      { name: 'working', map: 'working' },
      { name: 'employeeDetail', map: 'employeeDetail' }
    ],
    formatdata: function (data: any) {
      data["recordstartindex"] = data.pagenum * data.pagesize;
      data["totalRecords"] = 0;
      // data["extraParam"] = (this.extraParam!=undefined && this.extraParam!=null) ? this.extraParam : ((data.extraParam!=undefined && data.extraParam!=null) ? data.extraParam : extraParamTemp);
      return JSON.stringify(data);
    },
    root: 'Rows',
    cache: false,
    sort:()=>{
      this.myGrid.updatebounddata('sort');
    },
  
    filterHandler(event: any): void {
      this.totalrecords = 0;
      this.source.totalrecords = 0;
      alert("filtering")
      this.myGrid.updatebounddata('filter');
      //$(“#jqxgrid”).jqxGrid(‘updatebounddata’, ‘sort’);
  
      //TODO: filter focus
    },
    filter: () => {
      // update the grid and send a request to the server.
         this.totalrecords = 0;
         this.source.totalrecords = 0;
      this.myGrid.updatebounddata('filter');
    },
    beforeSend: function (jqxhr: any, settings: any) {
      //jqxhr.setRequestHeader("Content-Type","application/json");
      //jqxhr.setRequestHeader("Accept","*/*");
  },
    error: function (json: any, textStatus: any, errorThrown: any) {
     console.log(errorThrown)
    },
    beforeprocessing: (data: any) => {
      if (data.status == 'SUCCESS') {
     this.source.totalrecords = data.response.totalRecords;
       this.totalrecords = data.response.totalRecords;
        //utility.hideLodder ();
       return data.response.rows;
       //return data.response;
      } else {
        //utility.hideLodder();
        return [];
      }
    },
    downloadComplete: function (data: any, status: any, xhr: any) { 
      //console.log(xhr); 
   }
  };

  dataAdapter: any = new jqx.dataAdapter(this.source);
  rendergridrows = (params: any): any => {
    return params.data;
  }


  actionCallback(action: string, idValue: any) {
    if('view'=== action){
      this.router.navigate(['masters/group-master/view-group-master'], { queryParams: { param1: idValue } ,skipLocationChange:true});
    }else if('edit'=== action){
      this.router.navigate(['masters/group-master/edit-group-master'], { queryParams: { param1: idValue },skipLocationChange:true });
    }else if('flag'=== action){
      this.router.navigate(['masters/group-master/flag-group-master'], { queryParams: { param1: idValue },skipLocationChange:true });
    } 
  }
}

