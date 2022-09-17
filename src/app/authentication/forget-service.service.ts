import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../admin/user';

@Injectable({
  providedIn: 'root'
})
export class ForgetServiceService {
backendURL = environment.BACKEND_URL;
  constructor(
    private http:HttpClient,
  ) { }

  checkMail(model:User):Observable<any> {
    const url = this.backendURL + 'authentication/isUserValid/';
   return this.http.post(url, model)
  }

  public getSecurityQuestions():Observable<any>{
    const url = this.backendURL + 'authentication/getSecurityQuestions';
    return this.http.post(url,{})
  }

  public updatePassword(model:User):Observable<any>{
    const url = this.backendURL + 'authentication/resetPassword';
    return this.http.post(url,model);
  }
}
