import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeegridComponent } from './employeegrid.component';

describe('EmployeegridComponent', () => {
  let component: EmployeegridComponent;
  let fixture: ComponentFixture<EmployeegridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeegridComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeegridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
