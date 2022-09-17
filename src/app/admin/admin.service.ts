import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Department, User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
   backenedUrl = environment.BACKEND_URL;
   //braodCastId:Subject<number>=new Subject<number>()
  constructor(private http:HttpClient) { }

  public updateUserDepartment(user:User):Observable<any> {
    const url = this.backenedUrl + 'authentication/updateUserDepartment';
    return this.http.post(url,user)
  }

  public getAllDepartments():Observable<any> {
    const url = this.backenedUrl + 'department/getAllDepartments';
    return this.http.get(url)
  }

   public getUserById(id:number):Observable<any> {
    const url = this.backenedUrl + 'authentication/findUseById/'+id;
    return this.http.get(url)
  }

  public saveDepartment(department:Department):Observable<any> {
    const url = this.backenedUrl + 'department/saveDepartment';
    return this.http.post(url,department)
  }

  public updateDepartment(department:Department):Observable<any> {
    const url = this.backenedUrl + 'department/updateDepartment';
    return this.http.post(url,department)
  }

   public getDepartmentById(id:number):Observable<any> {
    const url = this.backenedUrl + 'department/getDepartmentById/'+id;
    return this.http.get(url)
  }

  public removeDepartmentByUserId(id:number):Observable<any> {
    const url = this.backenedUrl + 'authentication/removeDepartmentByUserId/'+id;
    return this.http.get(url)
  }
  
  public registration(model:User):Observable<any> {
    const url = this.backenedUrl + 'authentication/registration';
    return this.http.post(url,model);
  }

  public updateProfile(model:User):Observable<any> {
    const url = this.backenedUrl + 'authentication/updateProfile';
    return this.http.post(url,model);
  }
  public resetPassword(model:User):Observable<any> {
    const url = this.backenedUrl + 'authentication/resetPassword';
    return this.http.post(url,model);
  }

  public getDashBoardData():Observable<any> {
    const url = this.backenedUrl + 'authentication/getDashBoardData';
    return this.http.post(url,{});
  }
}
