import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileuploadService {

  constructor(private http: HttpClient) { }
  private apiUrl = 'http://localhost:3000';
  filesUpload(formData:FormData): Observable<any>{
    const uploadpath='upload'
  //  return this.http.get<departments[]>(`${this.apiUrl}/${departmentsEndpoint}`);
   return this.http.post(`${this.apiUrl}/${uploadpath}`,formData);
  }
}

