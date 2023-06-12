import { Component } from '@angular/core';
import { NavigationEnd, Router,RouterLinkActive  } from '@angular/router'; 
import { authservice } from '../../src/services/authservice/authservice '

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Motivity';
  isAuthenticated:any = false;
  router: Router;
  activeMenuItem: string ='';
  isProfile:boolean =false;

  constructor(private authService: authservice,router: Router) {
    this.router =router;
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
       if(authService.isLoggedIn())
       {
        this.isAuthenticated = true;
       } else{
        this.isAuthenticated = false;
       }
      }
    });
  }
  ngOnInit() {
    // Check if the user is already authenticated
    this.authService.getLoggedinMessage().subscribe((data)=>{
      this.isAuthenticated =data
      if(this.isAuthenticated){
        this.isProfile= this.authService.getisProfile();
      }
    });
  
    
    
   
  }
  signout(){
  
    this.authService.logout();
    this.isAuthenticated = false;
    this.router.navigate(['/login']);


  }
  setActiveMenuItem(menuItem: string): void {
    this.activeMenuItem = menuItem;
  }

}
