import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistrictDatatargetsComponent } from './district-datatargets.component';

describe('DistrictDatatargetsComponent', () => {
  let component: DistrictDatatargetsComponent;
  let fixture: ComponentFixture<DistrictDatatargetsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DistrictDatatargetsComponent]
    });
    fixture = TestBed.createComponent(DistrictDatatargetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
