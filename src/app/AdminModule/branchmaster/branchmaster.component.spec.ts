import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchmasterComponent } from './branchmaster.component';

describe('BranchmasterComponent', () => {
  let component: BranchmasterComponent;
  let fixture: ComponentFixture<BranchmasterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BranchmasterComponent]
    });
    fixture = TestBed.createComponent(BranchmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
