import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaSorteioComponent } from './tela-sorteio.component';

describe('TelaSorteioComponent', () => {
  let component: TelaSorteioComponent;
  let fixture: ComponentFixture<TelaSorteioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TelaSorteioComponent]
    });
    fixture = TestBed.createComponent(TelaSorteioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
