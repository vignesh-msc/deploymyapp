import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject, of } from "rxjs";
import { environment } from "../../app/environment/environment";
import { HttpClient} from '@angular/common/http';
import { register } from "src/app/Models/register";


// Implement authentication using a service and a token
@Injectable({
    providedIn: 'root'
  })
  export class authservice {
    constructor(private http: HttpClient) { }
    private _userRole: string ='';
    private subject = new Subject<any>();
  
    public get userRole(): string {
      return this._userRole;
    }
    sendloggedinMessage(isLoggedIn: boolean) {
      this.subject.next(isLoggedIn);
    }
  
    public login(email: string, password: string): Observable<any> {
      // Make API call to authenticate user and get a JWT token
      // ...
      return this.http.post<any>(`${environment.apiUrl}/login`, { email, password });
  
      // Store token and user role
     // localStorage.setItem('token', token);
    //  this._userRole = user.role;
  

    }
    public register(objregister:register): Observable<any> {
      // Make API call to authenticate user and get a JWT token
      // ...
      return this.http.post<any>(`${environment.apiUrl}/register`, objregister);
  
      // Store token and user role
     // localStorage.setItem('token', token);
    //  this._userRole = user.role;
  
      // return of(true);
    }
  
    public logout(): void {
      // Remove token and user role
      localStorage.removeItem('token');
     // this._userRole = null;
     this.subject.next( false );
    }
  
    public isLoggedIn(): boolean {
      // Check if user is authenticated by checking for token
      this.subject.next({ isLoggedIn: !!localStorage.getItem('token') });
      return !!localStorage.getItem('token');
    }

    getLoggedinMessage(): Observable<boolean> {
      return this.subject.asObservable();
    }
  }