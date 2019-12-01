import { TestBed } from '@angular/core/testing';

import { ListaBolosService } from './lista-bolos.service';

describe('ListaBolosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ListaBolosService = TestBed.get(ListaBolosService);
    expect(service).toBeTruthy();
  });
});
