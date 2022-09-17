import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-update-button',
  templateUrl: './update-button.component.html',
  styleUrls: ['./update-button.component.css']
})
export class UpdateButtonComponent implements OnInit {

  @Input() myForm!: FormGroup;
  @Output() childSaveSubmit=new EventEmitter<any>();
  button="Edit"
  constructor() { }

  ngOnInit(): void {
  }

  childFormSubmit(){
  if(this.myForm.valid){
    this.childSaveSubmit.emit(); 
   }
  }

}
