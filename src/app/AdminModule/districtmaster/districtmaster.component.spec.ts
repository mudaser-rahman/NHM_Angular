import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistrictmasterComponent } from './districtmaster.component';

describe('DistrictmasterComponent', () => {
  let component: DistrictmasterComponent;
  let fixture: ComponentFixture<DistrictmasterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DistrictmasterComponent]
    });
    fixture = TestBed.createComponent(DistrictmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
