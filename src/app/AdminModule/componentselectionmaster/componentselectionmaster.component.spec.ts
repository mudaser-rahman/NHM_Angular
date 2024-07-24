import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentselectionmasterComponent } from './componentselectionmaster.component';

describe('ComponentselectionmasterComponent', () => {
  let component: ComponentselectionmasterComponent;
  let fixture: ComponentFixture<ComponentselectionmasterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComponentselectionmasterComponent]
    });
    fixture = TestBed.createComponent(ComponentselectionmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
