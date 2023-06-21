import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Items,stockItem } from 'src/app/Models/product';

@Injectable({
  providedIn: 'root'
})
export class CartserviceService {

  private apiUrl = 'http://localhost:3000'; // Replace with your API URL


  constructor(private http: HttpClient) { }
  addcartItems(item: Items): any {
    const addcartEndpoint = 'createcart';
    return this.http.post<any>(`${this.apiUrl}/${addcartEndpoint}`, item)
  }
  getcartdetails(UserID: string): Observable<any>{
    const getcartdetails ='getcartdetails';
    return this.http.get<any>(`${this.apiUrl}/${getcartdetails}/${UserID}`)
  }
  getmasterstockitems():Observable<stockItem>{
    const getmasterstockitems ='getmasterstockitems';
    return this.http.get<stockItem>(`${this.apiUrl}/${getmasterstockitems}`)

  }
  cancelcartItems(Ids:any):any{
    const cancelitem = 'cart/items'
    return this.http.put<any>(`${this.apiUrl}/${cancelitem}`, Ids);
  }

}

