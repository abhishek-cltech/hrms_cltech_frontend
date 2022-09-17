import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthticationService } from '../authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private auth:AuthticationService,
    private router: Router,
    
    ){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if(!this.auth.isUserLoggedIn()){
       // alert(this.auth.isUserLoggedIn())
       this.router.navigate(['login'])
        return false;

      }
      //alert(this.auth.isUserLoggedIn())
    return this.auth.isUserLoggedIn();
  }
  
}
