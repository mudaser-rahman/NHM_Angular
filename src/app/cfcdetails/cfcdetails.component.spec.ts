import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CFCDetailsComponent } from './cfcdetails.component';

describe('CFCDetailsComponent', () => {
  let component: CFCDetailsComponent;
  let fixture: ComponentFixture<CFCDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CFCDetailsComponent]
    });
    fixture = TestBed.createComponent(CFCDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
