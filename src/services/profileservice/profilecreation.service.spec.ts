import { TestBed } from '@angular/core/testing';

import { ProfilecreationService } from './profilecreation.service';

describe('ProfilecreationService', () => {
  let service: ProfilecreationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfilecreationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
