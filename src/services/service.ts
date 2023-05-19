import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root' // This specifies that the service is provided at the root level
})
export class DataService {

  constructor(private http: HttpClient) { }

  private apiUrl: string ='https://jsonplaceholder.typicode.com/';
  getData(endpoint: string): Observable<any> {
    const url = `${this.apiUrl}${endpoint}`;
    return this.http.get(url)
    .pipe(
      map(response => {
        return response;
      })
    );



  

  }

  getempData(){
     let url1= 'http://localhost:3000/insert';
   let data ={
    empid:"1001",
    empname:"vignesh",
    department:"IT"
   }
    return this.http.post(url1, data);
  }

  postData(data: any): Observable<any> {

    return this.http.post('https://api.example.com/data', data);
  }

  updateData(data: any): Observable<any> {
    return this.http.put('https://api.example.com/data', data);
  }

  deleteData(id: number): Observable<any> {
    return this.http.delete(`https://api.example.com/data/${id}`);
  }
}
