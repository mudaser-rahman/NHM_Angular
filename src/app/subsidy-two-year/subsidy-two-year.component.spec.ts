import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubsidyTwoYearComponent } from './subsidy-two-year.component';

describe('SubsidyTwoYearComponent', () => {
  let component: SubsidyTwoYearComponent;
  let fixture: ComponentFixture<SubsidyTwoYearComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubsidyTwoYearComponent]
    });
    fixture = TestBed.createComponent(SubsidyTwoYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
