import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubsidyOneYearComponent } from './subsidy-one-year.component';

describe('SubsidyOneYearComponent', () => {
  let component: SubsidyOneYearComponent;
  let fixture: ComponentFixture<SubsidyOneYearComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubsidyOneYearComponent]
    });
    fixture = TestBed.createComponent(SubsidyOneYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
