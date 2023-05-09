import { TestBed } from '@angular/core/testing';

import { RniService } from './rni-service.service';

describe('RniServiceService', () => {
  let service: RniService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RniService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
