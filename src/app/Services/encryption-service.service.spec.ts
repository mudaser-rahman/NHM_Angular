import { TestBed } from '@angular/core/testing';

import { EncryptionService } from './encryption-service.service';

describe('EncryptionServiceService', () => {
  let service: EncryptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EncryptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
