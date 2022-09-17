import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-heading',
  templateUrl: './heading.component.html',
  styleUrls: ['./heading.component.css']
})
export class HeadingComponent implements OnInit {
   @Input("headingTitle") title:any="";
   @Input("backUrl") backUrl:any="";
   constructor(private router:Router) { }
   ngOnInit(): void {
   }
  backAction(){
    this.router.navigate([this.backUrl])
  }
}
