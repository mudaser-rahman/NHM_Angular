import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoEDetailsComponent } from './co-edetails.component';

describe('CoEDetailsComponent', () => {
  let component: CoEDetailsComponent;
  let fixture: ComponentFixture<CoEDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoEDetailsComponent]
    });
    fixture = TestBed.createComponent(CoEDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
