import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HQDataPhysicaltargetsComponent } from './hq-data-physicaltargets.component';

describe('HQDataPhysicaltargetsComponent', () => {
  let component: HQDataPhysicaltargetsComponent;
  let fixture: ComponentFixture<HQDataPhysicaltargetsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HQDataPhysicaltargetsComponent]
    });
    fixture = TestBed.createComponent(HQDataPhysicaltargetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
