import { TestBed } from '@angular/core/testing';

import { RweService } from './rwe.service';

describe('RweService', () => {
  let service: RweService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RweService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
