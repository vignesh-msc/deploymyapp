import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { authservice } from '../../authservice ';

@Injectable({
  providedIn: 'root'
})
export class LoginauthGuard implements CanActivate {
  constructor( private authService: authservice,private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      debugger;
      if (this.authService.isLoggedIn()) {
        this.router.navigate(['/dashboard']);
        return false;

      }
    return true;
  }
  
}
