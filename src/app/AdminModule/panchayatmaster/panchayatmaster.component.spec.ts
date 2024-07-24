import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanchayatmasterComponent } from './panchayatmaster.component';

describe('PanchayatmasterComponent', () => {
  let component: PanchayatmasterComponent;
  let fixture: ComponentFixture<PanchayatmasterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PanchayatmasterComponent]
    });
    fixture = TestBed.createComponent(PanchayatmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
