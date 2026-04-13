import { TestBed } from '@angular/core/testing';

import { RegisterStoreService } from './register-store.service';

describe('RegisterStoreService', () => {
  let service: RegisterStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegisterStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
