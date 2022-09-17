import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor( 
    
    ) { 
 
  }

  setLocalStorage(key:any,value:any){
     localStorage.setItem(key, value);
  }

  getLocalStorage(key:any):any{
    return localStorage.getItem(key);
  }

  removeLocalStorage(key:any){
    localStorage.removeItem(key);
  }

}
