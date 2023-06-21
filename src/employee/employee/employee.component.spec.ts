import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { EmployeeComponent } from './employee.component';
import { EmployeeService } from 'src/services/employee/Employeeservice';
import { empservice } from 'src/services/mockservices/empservice';
import { employee } from 'src/app/Models/employee';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { delay, of } from 'rxjs';


describe('EmployeeComponent', () => {
  let component: EmployeeComponent;
  let fixture: ComponentFixture<EmployeeComponent>;
  let myService: empservice;

  beforeEach(async () => {
    const getAllEmployeesSpy = jasmine.createSpy('getAllEmployees').and.returnValue(of([]));

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [EmployeeComponent],
      providers: [
        { provide: empservice, useClass: empservice },
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

      fixture = TestBed.createComponent(EmployeeComponent);
      component = fixture.componentInstance;
      myService = TestBed.inject(empservice);
      fixture.detectChanges();
  });



  it('should call log in on vignesh', () => {
    debugger;
    const empserviceSpy = spyOn(myService, 'getAllEmployees').and.returnValue(of([])).and.callThrough();;
   var a :any[] =[];;
    myService.getAllEmployees().subscribe((data)=>{
       a = data;
    })
    //component.GetAllemployees();
  console.log('q',a)
    expect(empserviceSpy).toHaveBeenCalled();
    expect(a.length).toEqual(1);




});
 
});
