import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CfcMasterComponent } from './cfc-master.component';

describe('CfcMasterComponent', () => {
  let component: CfcMasterComponent;
  let fixture: ComponentFixture<CfcMasterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CfcMasterComponent]
    });
    fixture = TestBed.createComponent(CfcMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
