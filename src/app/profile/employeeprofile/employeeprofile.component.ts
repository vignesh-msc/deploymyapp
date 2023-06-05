import { Component } from '@angular/core';
import { departments } from 'src/app/Models/employee';
import { EmployeeService } from 'src/services/employee/Employeeservice';
import{EmployeeRegistration} from 'src/app/Models/empregistration';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { EmployeeregistrationService } from 'src/services/employeeregistragtion/employeeregistration.service';
import { authservice } from 'src/services/authservice/authservice ';

@Component({
  selector: 'app-employeeprofile',
  templateUrl: './employeeprofile.component.html',
  styleUrls: ['./employeeprofile.component.css']
})
export class EmployeeprofileComponent {
 
  options:departments[] =[];
  defaultOptionId: string ='';
  contractType:string='';
  genderType:string='';
  model:any;
  selectedDate: Date = new Date();
  employeeForm: FormGroup;
  form: FormGroup;
  currentStep = 1;
  employee =new EmployeeRegistration();
  constructor(private empservice: EmployeeService,private formBuilder: FormBuilder,
    private datePipe: DatePipe,
    private toastr: ToastrService,private empregservice:EmployeeregistrationService,
    private auth:authservice
    ) {
      this.employeeForm = this.formBuilder.group({
        empcode:[this.employee.empcode, [Validators.required, this.validateEmployeeId()]],
        name: [this.employee.name,Validators.required],
        gender: [this.employee.gender,Validators.required],
        firstname: [this.employee.firstname,Validators.required],
        lastname: [this.employee.lastname,Validators.required],
        employementType: [this.employee.employementType,Validators.required],
        contactdetails: [this.employee.contactdetails,Validators.required],
        hireDate: [this.datePipe.transform(this.employee.hireDate, 'yyyy-MM-dd'), Validators.required],
        jobtitle: [this.employee.jobtitle,Validators.required],
        departmentname: [this.employee.departmentname,Validators.required],
        emergencycontactdetails: [this.employee.emergencycontactdetails,Validators.required]
          ,isActive: this.employee.isActive
        // deptId: [this.employee.gender,Validators.required],
        // userId: [this.employee.gender,Validators.required],
      });
  }
  ngOnInit() {
    // this.empservice.getEmployees().subscribe(data => {
    //   this.employeelist = data;
    // });
    this.empservice.getDepartments().subscribe((data)=>{
      this.options =data;
    });
    this.employeeForm = this.formBuilder.group({
      empcode:[this.employee.empcode, [Validators.required, this.validateEmployeeId()]],
      name: [this.employee.name,Validators.required],
      gender: [this.employee.gender,Validators.required],
      firstname: [this.employee.firstname,Validators.required],
      lastname: [this.employee.lastname,Validators.required],
      employementType: [this.employee.employementType,Validators.required],
      contactdetails: [this.employee.contactdetails,Validators.required],
      hireDate: [this.datePipe.transform(this.employee.hireDate, 'yyyy-MM-dd'), Validators.required],
      jobtitle: [this.employee.jobtitle,Validators.required],
      departmentname: [this.employee.departmentname,Validators.required],
      emergencycontactdetails: [this.employee.emergencycontactdetails,Validators.required],
      //  isActive: [this.employee.gender,Validators.required],
      deptId: this.employee.deptId,
      userId: this.employee.userId,
      isActive: this.employee.isActive
    });
    this.form = this.formBuilder.group({
      // Define your form fields here
      employee: this.formBuilder.group({
        empcode: ['', Validators.required],
        isActive: ['', Validators.required],
        UserId: ['', [Validators.required]]
      }),
      educationqualification: this.formBuilder.group({
        degree: ['', Validators.required],
        institution: ['', Validators.required],
        year: [0, Validators.required]
      }),
      // familyDetails: this.formBuilder.group({
      //   spouseName: ['', Validators.required],
      //   children: this.formBuilder.array([])
      // }),
      officialdetails: this.formBuilder.group({
        department: ['', Validators.required],
        company: ['', Validators.required],
        employeestatus: ['', Validators.required],
        employeetype: ['', Validators.required],
        manager: ['', Validators.required],
        officelocation: ['', Validators.required],
        worklocation: ['', Validators.required],
        dateofJoining: [this.datePipe.transform(this.employee.hireDate, 'yyyy-MM-dd'), Validators.required],
        designation: ['', Validators.required],
      }),
      statutorydetails: this.formBuilder.group({
        panNumber: ['', Validators.required],
        aadhaarNumber: ['', Validators.required],
        esiNumber: ['', Validators.required],
        pfNumber: ['', Validators.required]
    }),
    bankdetails:this.formBuilder.group({
      accountNumber: ['', Validators.required],
      bankName: ['', Validators.required],
      branch: ['', Validators.required],
      ifsccode: ['', Validators.required]

    })
  });
}
  handleDatePickerClick() {
    console.log('Date picker clicked!');
    // Add your logic here to handle the click event
  }
  nextStep() {
    this.currentStep++;
  }

  // Method to navigate to the previous step
  prevStep() {
    this.currentStep--;
  }
   validateEmployeeId(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const employeeId = control.value;
      if (employeeId === 0) {
        return { invalidEmployeeId: true };
      }
      return null;
    };
  }
 
  get f() {
    return this.employeeForm.controls;
  }
  onChangeDepartment(event: any) {
    const selectedOption = event.target.value;
    this.employee.deptId = selectedOption
    console.log(selectedOption);
  }

  onSubmit() {
    if (this.employeeForm.valid) {
      this.auth.getUserID()
      this.employee.userId = this.auth.getUserID();
      const valuesToPatch = {
        deptId: this.employee.deptId,
        userId: this.employee.userId,
        isActive:true,
        departmentname:this.options.filter(x=>x._id === this.employee.deptId)[0].name
      };
      this.employeeForm.patchValue(valuesToPatch);
      // Perform form submission or data processing
      this.empregservice.addEmployeedetails(this.employeeForm.value).subscribe({
        next: (response) => {
        },
        error: (error) => {
          this.toastr.error(error.error);
        },
      });
      console.log(this.employeeForm.value);
    } else {
      // Handle form validation errors
      if (this.employeeForm.invalid) {
        // Display toast message for each validation error
        if (this.f.empcode.invalid) {
          this.toastr.error('Please enter a employeeId.');
        }
        if (this.f.name.invalid) {
          this.toastr.error('Please enter the document number.');
        }
        if (this.f.firstname.invalid) {
          this.toastr.error('Please enter a firstname');
        }
        if (this.f.lastname.invalid) {
          this.toastr.error('Please enter a last name');
        }
        if (this.f.contactdetails.invalid) {
          this.toastr.error('Please enter contactdetails');
        }
        if (this.f.hireDate.invalid) {
          this.toastr.error('Please select a hire date');
        }
        if (this.f.jobtitle.invalid) {
          this.toastr.error('Please enter a valid job title');
        }
        if (this.f.departmentname.invalid) {
          this.toastr.error('Please enter a department name');
        }
        if (this.f.emergencycontactdetails.invalid) {
          this.toastr.error('Please enter emergency contact details');
        }
        return;
    }
    
    }
  }
  submitForm(){
    
  }
}









