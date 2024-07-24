import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CDBAETwoYearComponent } from './cdb-ae-two-year.component';

describe('CDBAETwoYearComponent', () => {
  let component: CDBAETwoYearComponent;
  let fixture: ComponentFixture<CDBAETwoYearComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CDBAETwoYearComponent]
    });
    fixture = TestBed.createComponent(CDBAETwoYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
