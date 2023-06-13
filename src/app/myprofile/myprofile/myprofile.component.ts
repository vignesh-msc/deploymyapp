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
 empprofile_edit:Employeeprofile;
 title="";
 selctededitdetials='';
  keys :string[] = [];
  isLoading:boolean = false;
  display: string = "none";
// Object.keys(officialDetails);
 constructor(private auth:authservice,private pf:ProfilecreationService){
  
 }
 ngOnInit() {
  this.isLoading =true;
this.pf.getProfileDetails(this.auth.getUserID()).subscribe({
  next: (response) => {
   this.empprofile = response;
   this.empprofile_edit = response;
    console.log('response',this.empprofile);
    this.keys = Object.keys(this.empprofile);
    this.isLoading = false;
  },
  error: (error) => {
    console.log('error',error);
    this.isLoading = false;
  },
});
 
 }
 onCloseHandled(){
  this.display = "none";
 }
 openModal(data: any,type:string){

  switch (type) {
    case 'Edq':
      this.selctededitdetials ='educationalqualification';
  this.title ="Edit Educational Details"
      break;
    case 'StatDtls':
      this.selctededitdetials ='statutorydetails';
      this.title ="Edit Statutory Details"
      break;
    case 'Bankdtls':
      this.selctededitdetials ="bankdetails";
      this.title ="Edit Bank Details"
      break;
    default:
      this.title ="Edit Details"
      break;
  }
  this.display = "block";
 }

}
