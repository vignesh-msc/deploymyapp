import { TestBed } from '@angular/core/testing';

import { EmployeeregistrationService } from './employeeregistration.service';

describe('EmployeeregistrationService', () => {
  let service: EmployeeregistrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeregistrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
