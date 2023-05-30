import { Component } from '@angular/core';
import { FileuploadService } from 'src/services/docuploadservice/fileupload.service';

@Component({
  selector: 'app-docupload',
  templateUrl: './docupload.component.html',
  styleUrls: ['./docupload.component.css']
})
export class DocuploadComponent {
  constructor(private fs:FileuploadService){

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
}
