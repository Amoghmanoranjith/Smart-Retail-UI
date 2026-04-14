import { TestBed } from '@angular/core/testing';

import { GetStoreService } from './get-store.service';

describe('GetStoreService', () => {
  let service: GetStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
