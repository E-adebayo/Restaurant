import { TestBed } from '@angular/core/testing';

import { CategorieserviceService } from './categorieservice.service';

describe('CategorieserviceService', () => {
  let service: CategorieserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategorieserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
