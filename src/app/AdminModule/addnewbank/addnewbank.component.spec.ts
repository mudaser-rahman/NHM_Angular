import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddnewbankComponent } from './addnewbank.component';

describe('AddnewbankComponent', () => {
  let component: AddnewbankComponent;
  let fixture: ComponentFixture<AddnewbankComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddnewbankComponent]
    });
    fixture = TestBed.createComponent(AddnewbankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
