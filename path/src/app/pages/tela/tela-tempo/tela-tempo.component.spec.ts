import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaTempoComponent } from './tela-tempo.component';

describe('TelaTempoComponent', () => {
  let component: TelaTempoComponent;
  let fixture: ComponentFixture<TelaTempoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TelaTempoComponent]
    });
    fixture = TestBed.createComponent(TelaTempoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
