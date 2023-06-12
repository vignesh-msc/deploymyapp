import { Component } from '@angular/core';
import { authservice } from 'src/services/authservice/authservice ';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  isProfile: boolean = false;
  constructor(private authService: authservice) {

  }
  ngOnInit() {
  this.isProfile= this.authService.getisProfile();
  console.log('this.isProfiledsashboard',this.isProfile);
}
 

}
