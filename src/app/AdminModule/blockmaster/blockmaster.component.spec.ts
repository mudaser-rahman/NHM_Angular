import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockmasterComponent } from './blockmaster.component';

describe('BlockmasterComponent', () => {
  let component: BlockmasterComponent;
  let fixture: ComponentFixture<BlockmasterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BlockmasterComponent]
    });
    fixture = TestBed.createComponent(BlockmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
