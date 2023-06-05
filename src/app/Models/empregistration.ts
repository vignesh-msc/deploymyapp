export class EmployeeRegistration {
    empcode: number;
    name: string;
    gender: string;
    firstname: string;
    lastname: string;
    employementType: string;
    contactdetails: string;
    hireDate: Date;
    jobtitle: string;
    departmentname: string;
    emergencycontactdetails: string;
    isActive: boolean;
    deptId: string;
    userId: string;
  
    constructor() {
      this.empcode = 0;
      this.name = '';
      this.gender = '';
      this.firstname = '';
      this.lastname = '';
      this.employementType = '';
      this.contactdetails = '';
      this.hireDate = new Date();
      this.jobtitle = '';
      this.departmentname = '';
      this.emergencycontactdetails = '';
      this.isActive = false;
      this.deptId = '';
      this.userId = '';
    }
  }
  