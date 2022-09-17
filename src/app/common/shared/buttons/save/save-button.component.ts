import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-save-button',
  templateUrl: './save-button.component.html',
  styleUrls: ['./save-button.component.css']
})
export class SaveButtonComponent implements OnInit {
  @Input() myForm!: FormGroup;
  @Output() childSaveSubmit=new EventEmitter<any>();
  button="Save"
  constructor() { }

  ngOnInit(): void {
  }

  childFormSubmit(){
  if(this.myForm.valid){
    this.childSaveSubmit.emit(); 
   }
  }
}
