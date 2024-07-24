import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PincodemasterComponent } from './pincodemaster.component';

describe('PincodemasterComponent', () => {
  let component: PincodemasterComponent;
  let fixture: ComponentFixture<PincodemasterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PincodemasterComponent]
    });
    fixture = TestBed.createComponent(PincodemasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
