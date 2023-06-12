import { Component } from '@angular/core';
import { authservice } from 'src/services/authservice/authservice ';
import { ProfilecreationService } from 'src/services/profileservice/profilecreation.service';
import{ Employeeprofile,BankDetails, EducationalQualification, OfficialDetails, StatutoryDetails} from '../../Models/profile';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent {

 // ProfilecreationService
 empprofile: Employeeprofile;
  keys :string[] = [];
  isLoading:boolean = false;
// Object.keys(officialDetails);
 constructor(private auth:authservice,private pf:ProfilecreationService){
  
 }
 ngOnInit() {
  this.isLoading =true;
this.pf.getProfileDetails(this.auth.getUserID()).subscribe({
  next: (response) => {
   this.empprofile = response;
    console.log('response',this.empprofile);
    this.keys = Object.keys(this.empprofile);
    this.isLoading = false;
  },
  error: (error) => {
    console.log('error',error);
  },
});
 
 }

}
