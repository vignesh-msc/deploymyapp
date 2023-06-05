import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeRegistration } from 'src/app/Models/empregistration';

@Injectable({
  providedIn: 'root'
})
export class EmployeeregistrationService {
  private apiUrl = 'http://localhost:3000'; // Replace with your API URL

  constructor(private http: HttpClient) { }

  addEmployeedetails(employee: EmployeeRegistration) {
    employee.empcode = Number(employee.empcode);
    const addEmployeedetailsEndpoint = 'addemployeedetails';
    return this.http.post<EmployeeRegistration>(`${this.apiUrl}/${addEmployeedetailsEndpoint}`, employee)
  
  }
  getEmployeeById(id: number): Observable<EmployeeRegistration> {
    const employeeprofileendpoint = 'getprofiledetails';
    return this.http.get<EmployeeRegistration>(`${this.apiUrl}/${employeeprofileendpoint}/${id}`);
  }

}
