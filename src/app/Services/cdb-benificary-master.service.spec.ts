import { TestBed } from '@angular/core/testing';

import { CdbBenificaryMasterService } from './cdb-benificary-master.service';

describe('CdbBenificaryMasterService', () => {
  let service: CdbBenificaryMasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CdbBenificaryMasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
