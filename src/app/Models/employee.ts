import { role } from "./role";


export class employeecols {
    id:number;
    columnname:string;
    ischecked:boolean;
    constructor(id: number, columnname: string, ischecked: boolean) {
        this.id = id;
        this.columnname = columnname;
        this.ischecked = ischecked;
    }

}

export class employee {
    empcode: number;
    empname: string;
    department:string;
    isActive:boolean;
    roles?: role[];
    constructor(empcode: number, empname: string,department: string,isActive: boolean,roles?:role[]) {
        this.empcode = empcode;
        this.empname = empname;
        this.department = department;
        this.isActive = isActive;
        this.roles = roles;
    }
}
export class User{
    name: string;
    age:number;
    email:string;
    constructor(name: string, age: number,email:string) {
      this.name = name;
      this.age = age;
      this.email = email;
  }
  
  }

export class employeeInfo {
    id: number;
    columnname:string;
    ischecked:boolean;
    isvisible?: boolean;
    parentId?:number;
  
    constructor(id:number, columnname: string,ischecked: boolean,isvisible:boolean,parentId:number) {
        this.id =id;
        this.columnname = columnname;
        this.ischecked = ischecked;
        this.isvisible = isvisible;
        this.parentId = parentId;
      
    }

}