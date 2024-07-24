import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BramchmasterComponent } from './bramchmaster.component';

describe('BramchmasterComponent', () => {
  let component: BramchmasterComponent;
  let fixture: ComponentFixture<BramchmasterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BramchmasterComponent]
    });
    fixture = TestBed.createComponent(BramchmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
