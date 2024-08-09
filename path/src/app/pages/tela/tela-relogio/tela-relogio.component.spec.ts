import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaRelogioComponent } from './tela-relogio.component';

describe('TelaRelogioComponent', () => {
  let component: TelaRelogioComponent;
  let fixture: ComponentFixture<TelaRelogioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TelaRelogioComponent]
    });
    fixture = TestBed.createComponent(TelaRelogioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
