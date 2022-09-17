import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-grid-heading',
  templateUrl: './grid-heading.component.html',
  styleUrls: ['./grid-heading.component.css']
})
export class GridHeadingComponent implements OnInit {

  @Input("headingTitle") title:any="";
  constructor() { }
  ngOnInit(): void {
  }

}
