import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CDBAEOneYearComponent } from './cdb-ae-one-year.component';

describe('CDBAEOneYearComponent', () => {
  let component: CDBAEOneYearComponent;
  let fixture: ComponentFixture<CDBAEOneYearComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CDBAEOneYearComponent]
    });
    fixture = TestBed.createComponent(CDBAEOneYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
