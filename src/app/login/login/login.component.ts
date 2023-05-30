import { Component } from '@angular/core';
import { authservice } from '../../../services/authservice/authservice ';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  submitted = false;
  errorMessage: string = '';
  public router: Router;

  constructor(private authService: authservice, private formBuilder: FormBuilder, router: Router) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      rememberMe: [false]
    });
    this.router = router;
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
    this.authService.sendloggedinMessage(false);
  }
  get f() { return this.loginForm.controls; }

  onSubmit() {
    debugger;
    this.submitted = true;
    debugger;
    if (this.loginForm.invalid) {
      return;
    }

      this.authService.login(this.loginForm.get('email')!.value, this.loginForm.get('password')!.value)
      .subscribe(
        data => {
          localStorage.setItem('token', data.token);
          // handle successful login
          this.router.navigate(['/dashboard']);
          this.errorMessage = '';
        },
        error => {
          this.errorMessage = error.error.message;
        });

   
  }



  // Getting the error messages for email field
  get emailErrorMessage() {
    const emailControl = this.loginForm.get('email');
    if (emailControl?.hasError('required')) {
      return 'Email is required';
    }
    if (emailControl?.hasError('email')) {
      return 'Invalid email format';
    }
    return '';
  }
  register(){
    this.router.navigate(['/register']);
  }

  // Getting the error messages for password field
  get passwordErrorMessage() {
    const passwordControl = this.loginForm.get('password');
    if (passwordControl?.hasError('required')) {
      return 'Password is required';
    }
    if (passwordControl?.hasError('minlength')) {
      return 'Password must be at least 6 characters long';
    }
    return '';
  }

}
