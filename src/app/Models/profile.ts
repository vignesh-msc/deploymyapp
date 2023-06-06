export class employee {
    empcode: number;
    isActive:boolean;
    userId: string
    constructor(empcode: number,isActive:boolean, userId: string) {
        this.empcode = empcode;
        this.isActive = isActive;
        this.userId = userId;
    }
}
export class educationqualification {
    empId: string = '';
    degree: string
    institution:string;
    year: number;
   
    constructor(empId: string,degree:string, institution: string,year: number) {
        this.empId = '';
        this.degree = degree;
        this.institution = institution;
        this.year = year;
    }
}


export class Bankdetails {
    empId: string = '';
    accountNumber: string;
    bankName: string;
    branch: string;
    ifsccode: string;
    constructor(empId: string,accountNumber:string, bankName: string,
        branch: string,ifsccode: string) {
        this.empId = '';
        this.accountNumber = accountNumber;
        this.bankName = bankName;
        this.branch = branch;
        this.ifsccode = ifsccode;
    }
}



export class officialDetails {
    empId: string ='';
    department:string;
    company:string;
    employeestatus: string;
    employeetype: string;
    manager: string;
    officelocation: string;
    worklocation: string;
    dateofjoining: Date;
    designation: string;

    constructor(empId: string, department: string, company: string, employeestatus: string,
        employeetype: string, manager: string, officelocation: string, worklocation: string,
        dateofjoining: Date, designation: string) {
        this.empId = empId;
        this.department = department;
        this.company = company;
        this.employeestatus = employeestatus;
        this.employeetype = employeetype;
        this.manager = manager;
        this.officelocation = officelocation;
        this.worklocation = worklocation;
        this.dateofjoining = dateofjoining;
        this.designation = designation;
    }
}
export class statutorydetails{
    empId: string ='';
    panNumber:string;
    aadhaarNumber: string;
    esiNumber: string;
    pfNumber: string;


    constructor(empId: string,panNumber:string, aadhaarNumber: string,
        esiNumber:string,pfNumber: string) {
        this.empId = '';
        this.panNumber = panNumber;
        this.aadhaarNumber = aadhaarNumber;
        this.esiNumber = esiNumber;
        this.pfNumber = pfNumber;
    }

}
//
// empId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'employee'
//   },
// panNumber: { type: String, required: true },
// aadhaarNumber: { type: String, required: true },
// esiNumber: { type: String },
// pfNumber: { type: String },
// // Other statutory details fields...
// },{ strictPopulate: false });