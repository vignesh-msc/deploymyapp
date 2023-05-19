import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from '../employee/employee/employee.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from '../app/login/login/login.component'
import { PayrollComponent } from '../app/payroll/payroll/payroll.component';
import { CommonModule } from '@angular/common';
import { PostsComponent } from '../../src/posts/posts/posts.component';
import { DashboardComponent } from '../../src/dashboard/dashboard/dashboard.component';
import{ EmployeegridComponent} from '../app/employeegrid/employeegrid/employeegrid.component';
import { AuthGuard } from '../../src/services/authservice/services/auth.guard';
import { RegisterComponent } from '../app/register/register/register.component';
import { NotfoundComponent } from './notfound/notfound/notfound.component';
import { LoginauthGuard } from 'src/services/authservice/services/loginguard/loginauth.guard';



// const routes: Routes = [ {path: '', component: DashboardComponent},{path: 'employee', component: EmployeeComponent},
// {path: 'payroll', component: PayrollComponent},
// {path:'posts',component:PostsComponent},{path:'grid',component:EmployeegridComponent},{path: 'login', component: LoginComponent}];


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
    { path: 'employee', component: EmployeeComponent, canActivate: [AuthGuard] }
    ,{path:'grid',component:EmployeegridComponent, canActivate: [AuthGuard]},
    {path:'posts',component:PostsComponent,canActivate: [AuthGuard]},
    {path:'login',component:LoginComponent,canActivate:[LoginauthGuard]},
    {path:'register',component:RegisterComponent},
    { path: '**', component: NotfoundComponent }
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes,{onSameUrlNavigation: 'reload'}),
    BrowserModule,
    FormsModule
    
  ],
  exports: [RouterModule],
  providers: [AuthGuard]
})

export class AppRoutingModule { }
