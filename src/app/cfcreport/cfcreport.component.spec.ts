import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CFCReportComponent } from './cfcreport.component';

describe('CFCReportComponent', () => {
  let component: CFCReportComponent;
  let fixture: ComponentFixture<CFCReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CFCReportComponent]
    });
    fixture = TestBed.createComponent(CFCReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
