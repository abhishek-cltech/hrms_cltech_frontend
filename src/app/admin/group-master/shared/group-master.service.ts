import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GroupMaster } from './group-master.model';

@Injectable({
  providedIn: 'root'
})
export class GroupMasterService {
  backenedUrl = environment.BACKEND_URL;
  constructor(private http:HttpClient) { }

  public getAllGroupMasters():Observable<any> {
    const url = this.backenedUrl + 'department/getGroupMasterByGroupName';
    return this.http.get(url)
  }

  public saveGroupMaster(department:GroupMaster):Observable<any> {
    const url = this.backenedUrl + 'department/saveGroupMaster';
    return this.http.post(url,department)
  }

  public updateGroupMaster(department:GroupMaster):Observable<any> {
    const url = this.backenedUrl + 'department/updateGroupMaster';
    return this.http.post(url,department)
  }

   public getGroupMasterById(id:number):Observable<any> {
    const url = this.backenedUrl + 'department/getGroupMasterById/'+id;
    return this.http.get(url)
  }
  
 


}
