import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-back-button',
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.css']
})
export class BackButtonComponent implements OnInit {

  @Input() myForm!: FormGroup;
  @Input() backUrl:string="";
  button="Back"
  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  backAction(){
    this.router.navigate([this.backUrl])
  }
}
