import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CFCSecretratyDetailsComponent } from './cfcsecretraty-details.component';

describe('CFCSecretratyDetailsComponent', () => {
  let component: CFCSecretratyDetailsComponent;
  let fixture: ComponentFixture<CFCSecretratyDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CFCSecretratyDetailsComponent]
    });
    fixture = TestBed.createComponent(CFCSecretratyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
