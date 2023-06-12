import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { departments, employee } from '../../app/Models/employee';
import { document } from 'src/app/Models/docs';

@Injectable({
  providedIn: 'root' // corrected value
})
export class EmployeeService {
  private apiUrl = 'http://localhost:3000'; // Replace with your API URL

  constructor(private http: HttpClient) { }
  private employeeListSubject = new BehaviorSubject<employee[]>([]);


  get employeeList$(): Observable<employee[]> {
    return this.employeeListSubject.asObservable();
  }

  //http://localhost:3000/departments
  getDepartments(): Observable<departments[]> {
    const departmentsEndpoint = 'departments'; // Custom endpoint
    return this.http.get<departments[]>(`${this.apiUrl}/${departmentsEndpoint}`);

  }
  getDocuments(): Observable<document[]> {
    const departmentsEndpoint = 'doclist'; // Custom endpoint
    return this.http.get<document[]>(`${this.apiUrl}/${departmentsEndpoint}`);

  }

  getEmployees(): Observable<employee[]> {

    // const cacheBustingParam = new Date().getTime();
    // const url = `${this.apiUrl}?_=${cacheBustingParam}`;

    const employeesEndpoint = 'employees'; // Custom endpoint
    return this.http.get<employee[]>(`${this.apiUrl}/${employeesEndpoint}`);

  }
  async fetchData() {

    const employeesEndpoint = 'employees'; // Custom endpoint
    return new Promise((resolve, reject) => {
      // Make an API call
      fetch(`${this.apiUrl}/${employeesEndpoint}`,{ cache: 'no-store' })
        .then(response => response.json())
        .then(data => {
          // Do something with the data
          resolve(data);
        })
        .catch(error => {
          reject(error);
        });
    });
  }


  getEmployeeById(id: number): Observable<employee> {
    return this.http.get<employee>(`${this.apiUrl}/${id}`);
  }
  addEmployee1(employee: employee): any {

    employee.empcode = Number(employee.empcode);
    const addEmployeeEndpoint = 'addemployee'; // Custom endpoint
    // const employeesEndpoint = 'employees'; // Custom endpoint
    return this.http.post<employee>(`${this.apiUrl}/${addEmployeeEndpoint}`, employee).pipe(

      tap((response) => {
        console.log('responseservice',response);
        if(response){
          let empRes=this.getEmployees();
          return empRes;
        }
        console.log('responseservice1',response)
       return null;
      })

    );
  }
  addEmployee(employee: employee) {
    employee.empcode = Number(employee.empcode);
    const addEmployeeEndpoint = 'addemployee';
    return this.http.post<employee>(`${this.apiUrl}/${addEmployeeEndpoint}`, employee)
  
  }
  

  updateEmployee(id: number, employee: employee): Observable<employee> {
    employee.empcode = Number(employee.empcode);
    const url = `${this.apiUrl}/editemployee/${employee.empcode}`; // Use correct route path and parameter syntax
    return this.http.put<employee>(url, employee);

  }

  // Method to delete an employee
  deleteEmployee(id: number, employee: employee): Observable<any> {
    employee.empcode = Number(employee.empcode);
    employee.isActive = false;
    const url = `${this.apiUrl}/deleteemployee/${employee.empcode}`; // Use correct route path and parameter syntax
    return this.http.put<employee>(url, employee).pipe(
      tap((response) => {
        if(response){
          let empRes=this.getEmployees(); 
          return empRes;
        }
       return null;
      })

    );
  }
}
