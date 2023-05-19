import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import{register} from '../../Models/register';
import { authservice } from 'src/services/authservice/authservice ';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  submitted = false;
  _register:register;
  public router: Router;
  iserrorMessage: boolean = false;
  errorMessage: string ='';

  get f() { return this.registerForm.controls; }
  constructor(private formBuilder: FormBuilder, private authService: authservice,router: Router) {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    this._register = new register('','','');
    this.router = router;
   }
  ngOnInit() {
    
  }

 

  onSubmit() {
    this.submitted = true;
    let objregister = new register(this.registerForm.get('name')!.value,this.registerForm.get('email')!.value
    ,this.registerForm.get('password')!.value);

    if (this.registerForm.invalid) {
        return;
    }
    // this.authService.register(objregister).subscribe((data)=>{
    //   if(data){
    //     this.errorMessage = 'Registration Failed';
    //     this.router.navigate(['/login']);
    //   }else{
    //     this.iserrorMessage =true;
    //     this.errorMessage = '';
    //   }

    // })
    this.authService.register(objregister).subscribe({
      next: (data) => {
        if(data){
          this.iserrorMessage = false;
          this.router.navigate(['/login']);
        }
         
        
      },
      error: (error) => {
        this.iserrorMessage = true;
        this.errorMessage = error.error.message;
        console.error(error);
      }
    });
    

    console.log(this.registerForm.value);
  }

}
