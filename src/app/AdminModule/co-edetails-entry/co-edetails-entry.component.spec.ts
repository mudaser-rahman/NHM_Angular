import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoEDetailsEntryComponent } from './co-edetails-entry.component';

describe('CoEDetailsEntryComponent', () => {
  let component: CoEDetailsEntryComponent;
  let fixture: ComponentFixture<CoEDetailsEntryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoEDetailsEntryComponent]
    });
    fixture = TestBed.createComponent(CoEDetailsEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
