import { Component } from '@angular/core';
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
  docno: string=''
 
   constructor(private fs:FileuploadService,private empservice:EmployeeService){
  }
  ngOnInit() {
   
  
    this.empservice.getDocuments().subscribe((data)=>{
      this.options =data;
    })
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
  showToast(): void {
    debugger;
    // this.toastr.error('I am a toaster');
  }

}
