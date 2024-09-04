import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaMediaComponent } from './tela-media.component';

describe('TelaMediaComponent', () => {
  let component: TelaMediaComponent;
  let fixture: ComponentFixture<TelaMediaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TelaMediaComponent]
    });
    fixture = TestBed.createComponent(TelaMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
