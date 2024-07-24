import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistrictleveldataEntryComponent } from './districtleveldata-entry.component';

describe('DistrictleveldataEntryComponent', () => {
  let component: DistrictleveldataEntryComponent;
  let fixture: ComponentFixture<DistrictleveldataEntryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DistrictleveldataEntryComponent]
    });
    fixture = TestBed.createComponent(DistrictleveldataEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
