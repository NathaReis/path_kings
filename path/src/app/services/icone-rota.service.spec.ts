import { TestBed } from '@angular/core/testing';

import { IconeRotaService } from './icone-rota.service';

describe('IconeRotaService', () => {
  let service: IconeRotaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IconeRotaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
