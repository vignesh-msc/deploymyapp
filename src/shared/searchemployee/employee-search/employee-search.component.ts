import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import{ employee } from '../../../app/Models/employee';
import { EmployeeService } from '../../../services/employee/Employeeservice'

@Component({
  selector: 'app-employee-search',
  templateUrl: './employee-search.component.html',
  styleUrls: ['./employee-search.component.css']
})
export class EmployeeSearchComponent {

  employees: employee[] =[];
  filteredEmployees: employee[] =[];
  searchTerm: string = '';
  selectedFilter: string = 'empcode';
  @Input() employee: employee[] =[];
  @Output() employeesearchresults = new EventEmitter<employee[]>();
  _employee:employee[]=[];
  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
   
  }
  ngOnChanges(changes: SimpleChanges) {
    this._employee = [...this.employee];
    this.filterEmployees();
  }
  filterEmployees(): void {
    debugger;
    if (!this.searchTerm) {
      this.filteredEmployees = this._employee;
    } else {
      this.filteredEmployees = this._employee.filter(employee => {
        switch(this.selectedFilter) {
          case 'empcode':
            return employee.empcode.toString().includes(this.searchTerm);
          case 'department':
            return employee.department.toLowerCase().includes(this.searchTerm.toLowerCase());
          case 'empname':
            return employee.empname.toLowerCase().includes(this.searchTerm.toLowerCase());
    
          default:
            return true;
        }
      });
    }
 
      this.employeesearchresults.emit(this.filteredEmployees);
}

setSearchFilter(event: Event): void {
  const filter = (event.target as HTMLSelectElement).value;
  if (filter) {
    this.selectedFilter = filter;
    this.filterEmployees();
  }
}
}