import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CDBLoComponent } from './cdb-lo.component';

describe('CDBLoComponent', () => {
  let component: CDBLoComponent;
  let fixture: ComponentFixture<CDBLoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CDBLoComponent]
    });
    fixture = TestBed.createComponent(CDBLoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
