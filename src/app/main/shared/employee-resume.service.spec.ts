import { TestBed } from '@angular/core/testing';

import { EmployeeResumeService } from './employee-resume.service';

describe('EmployeeResumeService', () => {
  let service: EmployeeResumeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeResumeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
