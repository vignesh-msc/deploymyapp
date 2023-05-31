import { Component } from '@angular/core';
import { departments } from 'src/app/Models/employee';
import { EmployeeService } from 'src/services/employee/Employeeservice';

@Component({
  selector: 'app-employeeprofile',
  templateUrl: './employeeprofile.component.html',
  styleUrls: ['./employeeprofile.component.css']
})
export class EmployeeprofileComponent {
  constructor(private empservice: EmployeeService) {
  }
  options:departments[] =[];
  defaultOptionId: string ='';
  contractType:string='';
  genderType:string='';
  model:any;
  selectedDate: Date = new Date();
  ngOnInit() {
    // this.empservice.getEmployees().subscribe(data => {
    //   this.employeelist = data;
    // });
    this.empservice.getDepartments().subscribe((data)=>{
      this.options =data;
    })
  }
  handleDatePickerClick() {
    console.log('Date picker clicked!');
    // Add your logic here to handle the click event
  }

}
