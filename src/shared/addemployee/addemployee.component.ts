import { Component, EventEmitter, Output } from '@angular/core';
import { departments, employee } from '../../app/Models/employee';
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
  employee: employee = new employee(0,'','' ,'', false);
  employeelist: employee[] = [];
  isduplicate: boolean = false;
  usermessage: string = '';
  display: string = "none";
  options:departments[] =[];
  defaultOptionId: string ='';
  constructor(private empservice: EmployeeService) {
  }
  ngOnInit() {
    // this.empservice.getEmployees().subscribe(data => {
    //   this.employeelist = data;
    // });
    this.empservice.getDepartments().subscribe((data)=>{
      this.options =data;
    })
  }
  addEmployee(empdata: employee) {
    empdata.isActive = true;
    empdata.deptId = this.defaultOptionId;
    empdata.departmentname =  this.options.filter(x=>x._id === empdata.deptId)[0].name;
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
    this.employee = { empcode: 0, empname: '', departmentname: '', isActive: false };
    this.empaddmodelclose.emit(true);
    this.display = "none";
  }
  clearData() {
    this.employee = { empcode: 0, empname: '', departmentname: '', isActive: false };
    this.usermessage = '';
  }
}
