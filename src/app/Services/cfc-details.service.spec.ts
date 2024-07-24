import { TestBed } from '@angular/core/testing';

import { CfcDetailsService } from './cfc-details.service';

describe('CfcDetailsService', () => {
  let service: CfcDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CfcDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
