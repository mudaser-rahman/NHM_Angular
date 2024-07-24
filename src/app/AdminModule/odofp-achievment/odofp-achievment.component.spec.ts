import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ODOFPAchievmentComponent } from './odofp-achievment.component';

describe('ODOFPAchievmentComponent', () => {
  let component: ODOFPAchievmentComponent;
  let fixture: ComponentFixture<ODOFPAchievmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ODOFPAchievmentComponent]
    });
    fixture = TestBed.createComponent(ODOFPAchievmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
