// import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// export function ValidateFileExtension(control: AbstractControl): { [key: string]: boolean } | null {
//     let extension=control.value.split('.').pop()!=="xlsx";
//   return extension?{ 'fileInvalid': true }:null;
// }

import {
    AbstractControl,
    ValidatorFn,
    FormControl,
    FormGroup
  } from '@angular/forms';
  
  export class CustomValidators {
    constructor() {}
  
    static onlyChar(): ValidatorFn {
      return (control: AbstractControl): { [key: string]: boolean } | null => {
        if (control.value == '') return null;
  
        let re = new RegExp('^[a-zA-Z ]*$');
        if (re.test(control.value)) {
          return null;
        } else {
          return { onlyChar: true };
        }
      };
    }
    
     static passwordMatch(password: string, confirmPassword: string): ValidatorFn {
        return (formGroup: AbstractControl): { [key: string]: any } | null => {
          const passwordControl = formGroup.get(password);
          const confirmPasswordControl = formGroup.get(confirmPassword);
    
          if (!passwordControl || !confirmPasswordControl) {
            return null;
          }
    
          if (
            confirmPasswordControl.errors &&
            !confirmPasswordControl.errors['passwordMismatch']
          ) {
            return null;
          }
    
          if (passwordControl.value !== confirmPasswordControl.value) {
            confirmPasswordControl.setErrors({ passwordMismatch: true });
            return { passwordMismatch: true };
          } else {
            confirmPasswordControl.setErrors(null);
            return null;
          }
        };
      }
  }