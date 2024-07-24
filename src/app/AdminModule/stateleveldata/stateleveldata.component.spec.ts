import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StateleveldataComponent } from './stateleveldata.component';

describe('StateleveldataComponent', () => {
  let component: StateleveldataComponent;
  let fixture: ComponentFixture<StateleveldataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StateleveldataComponent]
    });
    fixture = TestBed.createComponent(StateleveldataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
