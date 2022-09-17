import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/admin/admin.service';
import { AuthticationService } from 'src/app/authentication/authentication.service';
import { CustomValidators } from 'src/app/common/customValidators/validator';
import { SnackbarService } from 'src/app/common/utility/snackbar.service';
import { HttpStatus } from 'src/app/constant/enum';

@Component({
  selector: 'app-register-user-form',
  templateUrl: './register-user-form.ts.component.html',
  styleUrls: ['./register-user-form.ts.component.css']
})
export class RegisterUserForm implements OnInit {

  showPassword:boolean=false;
  showConfirmPassword:boolean=false;
  @Input('isIdReadOnlyCheck') isIdReadOnly!: boolean;
  @Input('isReadOnlyCheck') isReadOnly!: boolean;
  @Input('isHiddenCheck') isHidden!: boolean;
  roles:any;
  @Input() myForm!: FormGroup;

  constructor(
    private router: Router,
    private service:AdminService,
    private authService:AuthticationService,
    private snackbarService:SnackbarService,
    private activatedRoute:ActivatedRoute,
  ) { }
  
  ngOnInit(): void {
    this.getRole();
  }

  toggleVisibilityOfPassword(){
    this.showPassword=!this.showPassword;
  }

  toggleVisibilityOfConfirmPassword(){
    this.showConfirmPassword=!this.showConfirmPassword;
  }

  getRole(){
    this.authService.getRole().subscribe((data:any)=>{
      if(data!=null && data.response!=null && data.status==HttpStatus.SUCCESS){
        this.roles=data.response;
        this.myForm.patchValue(
          {
            'roleId':data.response[1]?.id
          }
        )
      }else{
        this.snackbarService.openErrorSnackBar(data.message)
      }
     })
  }
}
