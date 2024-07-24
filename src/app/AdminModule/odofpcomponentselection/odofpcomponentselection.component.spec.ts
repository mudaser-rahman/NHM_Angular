import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ODOFPComponentselectionComponent } from './odofpcomponentselection.component';

describe('ODOFPComponentselectionComponent', () => {
  let component: ODOFPComponentselectionComponent;
  let fixture: ComponentFixture<ODOFPComponentselectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ODOFPComponentselectionComponent]
    });
    fixture = TestBed.createComponent(ODOFPComponentselectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
