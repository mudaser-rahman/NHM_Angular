import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistictStatusReportComponent } from './distict-status-report.component';

describe('DistictStatusReportComponent', () => {
  let component: DistictStatusReportComponent;
  let fixture: ComponentFixture<DistictStatusReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DistictStatusReportComponent]
    });
    fixture = TestBed.createComponent(DistictStatusReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
