import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { departments, employee } from '../../../app/Models/employee';
import { EmployeeService } from '../../../../src/services/employee/Employeeservice';

@Component({
  selector: 'app-editemployee',
  templateUrl: './editemployee.component.html',
  styleUrls: ['./editemployee.component.css']
})
export class EditemployeeComponent {
  constructor( private empservice:EmployeeService) {}
  @Input() employee: employee ={ empcode: 0,empname: '',departmentname:'',isActive: false};
  @Output() empeditmodelclose = new EventEmitter<boolean>();

  //  variables for emplyee
  selectedEmployee: employee ={ empcode: 0,empname: '',departmentname:'',isActive: false};
  setEmployee: employee ={ empcode: 0,empname: '',departmentname:'',isActive: false};
  defaultOptionId: string ='';
  options:departments[] =[];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['employee']) {
      this.selectedEmployee = { ...this.employee };
      this.setEmployee ={...this.employee}

      // this.defaultOptionId =this.setEmployee.departmentname;
     
    }
  }
  ngOnInit(){
    this.empservice.getDepartments().subscribe((data)=>{
      this.options =data;
    })
  }
  onCloseHandled() {
    this.empeditmodelclose.emit(true);
  }
  editable(d: any, type: string) {
    if (type === 'api') {
      // d.department = this.defaultOptionId;
      this.empservice.updateEmployee(d.empcode, d).subscribe((data) => {
        this.empeditmodelclose.emit(false);
    
      })
    } else {
      this.empeditmodelclose.emit(false);
   
    }

  }
// used to set employee data to actual value if edit data is cancelled or model closed without saving.
  updateData(){
   this.selectedEmployee =this.setEmployee;
  }

}
