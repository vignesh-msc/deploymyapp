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
    private email = localStorage.getItem('email');
    private usersubject = new Subject<any>();
    private subject = new Subject<any>();
  
    public get userRole(): string {
      return this._userRole;
    }
    sendloggedinMessage(isLoggedIn: boolean) {
      this.subject.next(isLoggedIn);
    }
  
    public login(email: string, password: string): Observable<any> {
      return this.http.post<any>(`${environment.apiUrl}/login`, { email, password });
    }
    public register(objregister:register): Observable<any> {
      return this.http.post<any>(`${environment.apiUrl}/register`, objregister);
  
      // Store token and user role
     // localStorage.setItem('token', token);
    //  this._userRole = user.role;
  
      // return of(true);
    }
  
    public logout(): void {
        localStorage.removeItem('token');
     // this._userRole = null;
     this.subject.next( false );
    }
    
  
    public isLoggedIn(): boolean {
      // Check if user is authenticated by checking for token
      this.subject.next({ isLoggedIn: (!!localStorage.getItem('token')) });
      return !!(localStorage.getItem('token'));
    }
    public getUserID(): string{
      return localStorage.getItem('UserID')!;
    }
    public getisProfile(): boolean{
      const isProfileValue = localStorage.getItem('isProfile');
     // this.usersubject.next(isProfileValue === 'true');
      return isProfileValue === 'true';
    }
    

    getLoggedinMessage(): Observable<boolean> {
      return this.subject.asObservable();
    }
    getprofileActiveMessage(): Observable<boolean> {
      return this.usersubject.asObservable();
    }
  }