import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CdbLoginComponent } from './cdb-login.component';

describe('CdbLoginComponent', () => {
  let component: CdbLoginComponent;
  let fixture: ComponentFixture<CdbLoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CdbLoginComponent]
    });
    fixture = TestBed.createComponent(CdbLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
