import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeneficearydetailsComponent } from './beneficearydetails.component';

describe('BeneficearydetailsComponent', () => {
  let component: BeneficearydetailsComponent;
  let fixture: ComponentFixture<BeneficearydetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BeneficearydetailsComponent]
    });
    fixture = TestBed.createComponent(BeneficearydetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
