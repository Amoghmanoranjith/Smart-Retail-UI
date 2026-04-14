import { TestBed } from '@angular/core/testing';

import { JwtHeaderService } from './jwt-header.service';

describe('JwtHeaderService', () => {
  let service: JwtHeaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JwtHeaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
