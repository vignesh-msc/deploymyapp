import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import{ Employeeprofile,BankDetails, EducationalQualification, OfficialDetails, StatutoryDetails} from '../../../src/app/Models/profile';

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
  getProfileDetails(UserID: string){
    const getProfileEndpoint ='getemployeeprofile';
    return this.http.get<any>(`${this.apiUrl}/${getProfileEndpoint}/${UserID}`).pipe(
      map(response => {
        const empprofile: Employeeprofile = {
          empcode: '',
          bankdetails: response.bankDetails as BankDetails,
          educationalqualification: response.educationalQualification as EducationalQualification,
          officialdetails: response.OfficialDetails as OfficialDetails,
          statutorydetails: response.statutoryDetails as StatutoryDetails
        };
        return empprofile;
      })
    );
  //  return this.http.get<any>(`${this.apiUrl}/${getProfileEndpoint}/${UserID}`);
  }
}
