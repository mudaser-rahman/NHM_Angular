import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VillagemasterComponent } from './villagemaster.component';

describe('VillagemasterComponent', () => {
  let component: VillagemasterComponent;
  let fixture: ComponentFixture<VillagemasterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VillagemasterComponent]
    });
    fixture = TestBed.createComponent(VillagemasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
