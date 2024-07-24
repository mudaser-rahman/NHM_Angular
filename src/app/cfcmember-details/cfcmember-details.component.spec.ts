import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CFCMemberDetailsComponent } from './cfcmember-details.component';

describe('CFCMemberDetailsComponent', () => {
  let component: CFCMemberDetailsComponent;
  let fixture: ComponentFixture<CFCMemberDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CFCMemberDetailsComponent]
    });
    fixture = TestBed.createComponent(CFCMemberDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
