import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatewisebeneficearydetailsComponent } from './statewisebeneficearydetails.component';

describe('StatewisebeneficearydetailsComponent', () => {
  let component: StatewisebeneficearydetailsComponent;
  let fixture: ComponentFixture<StatewisebeneficearydetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StatewisebeneficearydetailsComponent]
    });
    fixture = TestBed.createComponent(StatewisebeneficearydetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
