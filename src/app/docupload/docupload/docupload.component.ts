import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { document } from 'src/app/Models/docs';
import { FileuploadService } from 'src/services/docuploadservice/fileupload.service';
import { EmployeeService } from 'src/services/employee/Employeeservice';



@Component({
  selector: 'app-docupload',
  templateUrl: './docupload.component.html',
  styleUrls: ['./docupload.component.css']
})
export class DocuploadComponent {
  options:document[] =[];
  defaultOptionId: string  ='';
  issueDate: Date = new Date();
  validDate: Date = new Date();
  validtillDate: Date = new Date();
  docno: string='';
  form: FormGroup;
 
   constructor(private fs:FileuploadService,private empservice:EmployeeService,
    private formBuilder: FormBuilder,private toastr: ToastrService){
      this.form = this.formBuilder.group({
        type: ['', Validators.required],
        docNo: ['', Validators.required],
        issueDate: ['', Validators.required],
        validTill: ['', Validators.required],
        docFile: ['', Validators.required]
      });
  }
  ngOnInit() {
   
  
    this.empservice.getDocuments().subscribe((data)=>{
      this.options =data;
    });
  }
    // Convenience getter for easy access to form control fields
    get f() {
      return this.form.controls;
    }
  handleFileInput(files: FileList): void {
    const file = files.item(0);
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
    
      // const fileData = {
      //   filename: file.name,
      //   originalname: file.name,
      //   path: file.name,
      // };
      // formData.append('fileData', JSON.stringify(fileData));
  
      this.fs.filesUpload(formData).subscribe({
        next: (data) => {
          // Handle the response data
          console.log('File uploaded successfully!', data);
        },
        error: (err) => {
          // Handle the error
          console.error('Error uploading file:', err);
        }
      });
    }
  }
  handleDatePickerClick() {
    console.log('Date picker clicked!');

  }
  submitDetails(): void {

    if (this.form.invalid) {
      // Display toast message for each validation error
      if (this.f.type.invalid) {
        this.toastr.error('Please select a type.', 'Validation Error');
      }
      if (this.f.docNo.invalid) {
        this.toastr.error('Please enter the document number.', 'Validation Error');
      }
      if (this.f.issueDate.invalid) {
        this.toastr.error('Please select an issue date.', 'Validation Error');
      }
      if (this.f.validTill.invalid) {
        this.toastr.error('Please select a valid till date.', 'Validation Error');
      }
      if (this.f.docFile.invalid) {
        this.toastr.error('Please select a file.', 'Validation Error');
      }
      return;
  }
  const issueDate = new Date(this.f.issueDate.value);
  const validTillDate = new Date(this.f.validTill.value);

  if (issueDate > validTillDate) {
    this.toastr.error('Issue Date should not be greater than Valid Till date.', 'Validation Error');
    return;
  }
  this.toastr.success('Details submitted succesfully', 'Success');

  }
}
