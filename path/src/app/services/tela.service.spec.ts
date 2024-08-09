import { TestBed } from '@angular/core/testing';

import { TelaService } from './tela.service';

describe('TelaService', () => {
  let service: TelaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TelaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
