import { Component, EventEmitter, Output } from '@angular/core';
import { employee } from '../../app/Models/employee';
import { EmployeeService } from '../../../src/services/employee/Employeeservice';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-addemployee',
  templateUrl: './addemployee.component.html',
  styleUrls: ['./addemployee.component.css']
})
export class AddemployeeComponent {
 
  @Output() employeeAdded = new EventEmitter<employee>();
  @Output() empaddmodelclose = new EventEmitter<boolean>();
  employee: employee = new employee(0, '', '', false);
  employeelist: employee[] = [];
  isduplicate: boolean = false;
  usermessage: string = '';
  display: string = "none";
  constructor(private empservice: EmployeeService) {
  }
  ngOnInit() {
    // this.empservice.getEmployees().subscribe(data => {
    //   this.employeelist = data;
    // });
  }
  addEmployee(empdata: employee) {
    empdata.isActive = true;
    this.empservice.addEmployee(empdata).subscribe(() => {
      this.isduplicate = false;
      this.usermessage = '';
      this.onaddCloseHandled();
      this.empservice.fetchData().then(data => {
        this.employeeAdded.emit(empdata);
      }).catch(error => {

      });
    }, (error: HttpErrorResponse) => {
      this.isduplicate = true;
      this.usermessage = error.error;

    })

  }
  onaddCloseHandled() {
    this.isduplicate = false;
    this.usermessage = '';
    this.employee = { empcode: 0, empname: '', department: '', isActive: false };
    this.empaddmodelclose.emit(true);
    this.display = "none";
  }
  clearData() {
    this.employee = { empcode: 0, empname: '', department: '', isActive: false };
    this.usermessage = '';
  }
}
