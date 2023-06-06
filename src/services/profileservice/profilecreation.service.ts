import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfilecreationService {
  private apiUrl = 'http://localhost:3000'; //
  constructor(private http: HttpClient) {

   }

   addEmployeeprofile(employeedetails: any) : Observable<any> {
    const addEmployeeEndpoint = 'createmployee';
  return this.http.post<any>(`${this.apiUrl}/${addEmployeeEndpoint}`, employeedetails);
  
  }
}
