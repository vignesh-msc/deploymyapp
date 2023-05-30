import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { Routes } from '@angular/router';
import { RegisterComponent } from 'src/app/register/register/register.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LoginRoutingModule
  ]
})
export class LoginRoutingModule { }
