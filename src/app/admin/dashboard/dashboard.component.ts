import { Component, OnInit } from '@angular/core';
import { HttpStatus } from 'src/app/constant/enum';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  title="Dashboard"
  dashboardData:any;
  constructor(private service:AdminService) { }

  ngOnInit(): void {
    this.getDashBoardData();
  }

  getDashBoardData(){
    this.service.getDashBoardData().subscribe((data)=>{
      if(data!=null && data!=undefined && data.response!=null && data.status==HttpStatus.SUCCESS){
       this.dashboardData=data.response;
      }else{

      }
    })


  }
}
