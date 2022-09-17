import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FooterComponent implements OnInit {

  date:number=new Date().getFullYear();

  get year(){
    return new Date().getFullYear();
  }

  constructor() { }

  ngOnInit(): void {
  }

}
