import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../admin/user';

@Injectable({
  providedIn: 'root'
})
export class PopUpService {

  backenedUrl = environment.BACKEND_URL;
  constructor(private http:HttpClient) { }
  
  public updateProfile(model:User):Observable<any> {
    const url = this.backenedUrl + 'authentication/updateProfile';
    return this.http.post(url,model);
  }
}
