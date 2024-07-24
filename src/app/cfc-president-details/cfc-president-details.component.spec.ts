import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CfcPresidentDetailsComponent } from './cfc-president-details.component';

describe('CfcPresidentDetailsComponent', () => {
  let component: CfcPresidentDetailsComponent;
  let fixture: ComponentFixture<CfcPresidentDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CfcPresidentDetailsComponent]
    });
    fixture = TestBed.createComponent(CfcPresidentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
