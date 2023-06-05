import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeComponent } from '../employee/employee/employee.component'
import { LoginComponent } from '../app/login/login/login.component';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { PayrollComponent } from '../app/payroll/payroll/payroll.component';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { PostsComponent } from '../../src/posts/posts/posts.component';
import { AddemployeeComponent } from '../../src/shared/addemployee/addemployee.component';
import { EditemployeeComponent } from '../../src/shared/editemployee/editemployee/editemployee.component';
import { EmployeeSearchComponent } from '../../src/shared/searchemployee/employee-search/employee-search.component';
import { DashboardComponent } from '../../src/dashboard/dashboard/dashboard.component';
import { LoaderComponent } from '../app/loader/loader/loader.component';
import { EmployeegridComponent } from '../app/employeegrid/employeegrid/employeegrid.component';
import { RegisterComponent } from '../app/register/register/register.component';
import { AuthInterceptor } from './interceptors/AuthInterceptor';
import { SqrtPipe } from './pipes/sqrt';
import { DocuploadComponent } from './docupload/docupload/docupload.component';
import { EmployeeprofileComponent } from './profile/employeeprofile/employeeprofile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { MyprofileComponent } from './myprofile/myprofile/myprofile.component';





@NgModule({
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
    declarations: [
    AppComponent,
    EmployeeComponent,
    LoginComponent,
    PayrollComponent,
    PostsComponent,
    AddemployeeComponent,
    EditemployeeComponent,
    EmployeeSearchComponent,
    DashboardComponent,
    LoaderComponent,
    EmployeegridComponent,
    RegisterComponent,
    SqrtPipe,
    DocuploadComponent,
    EmployeeprofileComponent,
    MyprofileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()

  ],
  providers: [HttpClient, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
