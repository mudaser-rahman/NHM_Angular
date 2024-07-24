import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SucessStoryComponent } from './sucess-story.component';

describe('SucessStoryComponent', () => {
  let component: SucessStoryComponent;
  let fixture: ComponentFixture<SucessStoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SucessStoryComponent]
    });
    fixture = TestBed.createComponent(SucessStoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
