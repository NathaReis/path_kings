import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaComponent } from './tela.component';

describe('TelaComponent', () => {
  let component: TelaComponent;
  let fixture: ComponentFixture<TelaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TelaComponent]
    });
    fixture = TestBed.createComponent(TelaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
