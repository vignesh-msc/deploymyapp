import { Component } from '@angular/core';
import { departments } from 'src/app/Models/employee';
import { EmployeeService } from 'src/services/employee/Employeeservice';
import{EmployeeRegistration} from 'src/app/Models/empregistration';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { EmployeeregistrationService } from 'src/services/employeeregistragtion/employeeregistration.service';
import { authservice } from 'src/services/authservice/authservice ';
import { employee,educationqualification,Bankdetails,officialDetails
,statutorydetails } from 'src/app/Models/profile';
import { ProfilecreationService } from 'src/services/profileservice/profilecreation.service';

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
    private auth:authservice,private pf:ProfilecreationService
    ) {
    

  }
  ngOnInit() {
    this.empservice.getDepartments().subscribe((data)=>{
      this.options =data;
    });
    this.form = this.formBuilder.group({
      // Define your form fields here
      employee: this.formBuilder.group({
        empcode: ['', Validators.required],
        isActive: [''],
        UserId: ['']
      }),
      educationqualification: this.formBuilder.group({
        degree: ['', Validators.required],
        institution: ['', Validators.required],
        year: [0, [Validators.required, this.validateNumericId()]]
      }),
      // familyDetails: this.formBuilder.group({
      //   spouseName: ['', Validators.required],
      //   children: this.formBuilder.array([])
      // }),
      officialdetails: this.formBuilder.group({
        departmentname: ['', Validators.required],
        company: ['', Validators.required],
        employeestatus: ['', Validators.required],
        employeetype: ['', Validators.required],
        manager: ['', Validators.required],
        officelocation: ['', Validators.required],
        worklocation: ['', Validators.required],
        dateofJoining: [null, Validators.required],
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
  nextStepemployee(formGroup: AbstractControl){
    if(formGroup.valid){
      this.currentStep++;
    } else{
    this.toastr.error('Please fill all the details in the form');
    }
 
  }

  // Method to navigate to the previous step
  prevStep(formGroup: AbstractControl) {
    if(formGroup.valid){
      this.currentStep--;
    } else{
      this.toastr.error('Please fill all the details in the form');
    }
   
  }
   validateNumericId(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const Id = control.value;
      if (Id === 0) {
        return { invalidEmployeeId: true };
      }
      return null;
    };
  }
 
  get f() {
    return this.employeeForm.controls;
  }
  get g() {
    return this.form.controls;
  }
  onChangeDepartment(event: any) {
    const selectedOption = event.target.value;
    this.employee.deptId = selectedOption
    console.log(selectedOption);
  }

  onSubmit() {
   
  }
  submitForm(){
    if(this.form.valid){
      let reqbody = this.prepareModel();
      console.log('reqbody',reqbody);
      this.pf.addEmployeeprofile(reqbody).subscribe({
        next: (response) => {
          console.log('response',response);
          this.toastr.error('Employee Profile created Successfully');
        },
        error: (error) => {
          this.toastr.error(error.error);
        },
      });
    } else{
      this.toastr.error('Please fill all the details in the form');
    }
  }
  prepareModel(): any{
    let reqbody: any={};
    const formValues = this.form.value;
    let employeeentity = new employee(formValues.employee.empcode,true,this.auth.getUserID());
    let edqualificationentity = new educationqualification('0',formValues.educationqualification.degree,
    formValues.educationqualification.institution,formValues.educationqualification.year);
    let bankdetailsenttity = new Bankdetails('0',formValues.bankdetails.accountNumber,formValues.bankdetails.bankName,
    formValues.bankdetails.branch,formValues.bankdetails.ifsccode);
    let deptId = this.options.filter(x=>x._id === formValues.officialdetails.departmentname)[0].name;
    let officialdetailsentity = new officialDetails('0',deptId,formValues.officialdetails.company,formValues.officialdetails.employeestatus,
    formValues.officialdetails.employeetype,formValues.officialdetails.manager,formValues.officialdetails.officelocation,
    formValues.officialdetails.worklocation,formValues.officialdetails.dateofJoining,formValues.officialdetails.designation);
    let statutorydetailsentity = new statutorydetails('0',formValues.statutorydetails.panNumber,
    formValues.statutorydetails.aadhaarNumber,formValues.statutorydetails.esiNumber,formValues.statutorydetails.pfNumber);
    reqbody.employeeentity = employeeentity;
    reqbody.edqualificationentity = edqualificationentity;
    reqbody.bankdetailsenttity = bankdetailsenttity;
    reqbody.officialdetailsentity = officialdetailsentity;
    reqbody.statutorydetailsentity = statutorydetailsentity;
    return reqbody;
      
  }
}









