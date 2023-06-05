import { Component, Input, ViewChild } from '@angular/core';
import { employee } from '../../../src/app/Models/employee';
import { EmployeeService } from '../../services/employee/Employeeservice';
import { Router } from '@angular/router';
import { AddemployeeComponent } from 'src/shared/addemployee/addemployee.component';
import { EditemployeeComponent } from 'src/shared/editemployee/editemployee/editemployee.component';
import { EmployeeConstant } from '../../../src/app/constants/employee';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent {
  employeeslist: employee[] = [];
  employeemasterlist : employee[] =[];
  editemployee: employee = { empcode: 0, empname: '', departmentname: '', isActive: false };
  isaddemp: boolean = false;
  iseditemp: boolean = true;
  localflagcode: boolean = true;
  ispopupeditable: boolean = false;
  display: string = "none";
  isempty: boolean = false;
  isLoading:boolean = false;
  employee: employee = new employee(0,'', '', '', false);
  // output variables and  viewchild for inter component communication
  @ViewChild('addComponent') addComponent?: AddemployeeComponent;
  @ViewChild('editComponent') editComponent?: EditemployeeComponent;
  @Input() public _employee = new employee(0, '','', '', false);

  constructor(private empservice: EmployeeService, private router: Router) {

  }
  ngOnInit() {
    this.isLoading =true;
    this.GetAllemployees();
  }

  onEmployeeAdded(employee: employee) {
    if (employee !== null) {
      this.GetAllemployees();
      this.isaddemp = false;
      this.onCloseHandled();
    } else {
      this.onCloseHandled();
    }

  }
  employeesearch_results(filtereddata :employee[]){
    if(filtereddata && filtereddata.length>0){
     // this.employeemasterlist =[...this.employeemasterlist];
      this.employeeslist = filtereddata;
     this.isempty = false;

    } else{
      this.employeeslist = filtereddata;
         this.isempty = true;
    }
  }
  employeeditbtnclose(isCancel: boolean) {
    if (!isCancel) {
      this.GetAllemployees();
      this.iseditemp = false;
      this.onCloseHandled();
    } else {
      this.iseditemp = false;
      this.onCloseHandled();
    }
  }

  GetAllemployees() {
    this.empservice.getEmployees().subscribe(
      (data) => {
        this.employeeslist = data;
        console.log('this.employeeslist',this.employeeslist);
        this.employeeslist = this.employeeslist.filter(x => x.isActive === true);
        this.employeemasterlist = this.employeeslist;
        this.isLoading = false;
        if (this.employeeslist && this.employeeslist.length > 0) {
          this.isempty = false;
        } else {
          this.isempty = true;
        }
      },
      (error) => {
        this.isLoading = false;
        this.isempty = true;
      }
    );
  
  }

  trackByFn(index: number, item: any): any {
    return item.id;
  }
  sort(columnName: string) {
    switch (columnName) {
      case EmployeeConstant.EMPLOYEE_CODE:
        if (this.localflagcode) {
          this.employeeslist = this.employeeslist.sort((a, b) => {
            return a.empcode - b.empcode;
          });

        } else {
          this.employeeslist = this.employeeslist.sort((a, b) => {
            return b.empcode - a.empcode;
          });

        }
        this.localflagcode = !this.localflagcode;
        break;
      case EmployeeConstant.EMPLOYEE_NAME:
        if (this.localflagcode) {
          this.employeeslist = this.employeeslist.sort((a, b) => {
            return (a.empname).localeCompare(b.empname);
          });

        } else {
          this.employeeslist = this.employeeslist.sort((a, b) => {
            return (b.empname).localeCompare(a.empname);
          });
        }
        this.localflagcode = !this.localflagcode;
        break;
      case EmployeeConstant.EMPLOYEE_DEPARTMENT:
        if (this.localflagcode) {
          this.employeeslist = this.employeeslist.sort((a, b) => {
            return (a.departmentname).localeCompare(b.departmentname);
          });

        } else {
          this.employeeslist = this.employeeslist.sort((a, b) => {
            return (b.departmentname).localeCompare(a.departmentname);
          });
        }
        this.localflagcode = !this.localflagcode;
        break;
      default:
        // handle invalid column name
        break;
    }

  }
  openModal(data: string, emp: any) {
    debugger;
    if (data === 'add') {
      this.isaddemp = true;
      this.iseditemp = false;
    } else if (data === 'edit') {
      this.isaddemp = false;
      this.iseditemp = true;
      this.editemployee = emp;
    }

    // no need this setting until now
    this.display = "block";
  }

  onCloseHandled() {
    // the shared components are called from parent component employeee.
    if (this.iseditemp) {
      if (this.editComponent)
        this.editComponent.updateData();
    }
    if (this.isaddemp) {
      if (this.addComponent) {
        this.addComponent.clearData();
      }
    }
    this.display = "none";
  }
  delete(data: employee) {
    this.empservice.deleteEmployee(data.empcode, data).subscribe((res) => {
      this.GetAllemployees();

    });
  }
  // addEmployee(data: employee) {
  //   this.empservice.addEmployee(data).subscribe(data => {
  //     this.empservice.getEmployees().subscribe(data => {
  //       this.employeeslist = data;
  //       this.employeeslist =[... this.employeeslist];
  //       this.onCloseHandled();
  //     });
  //   })
  // }

  onCancel() {
    this.onCloseHandled();
  }

}



