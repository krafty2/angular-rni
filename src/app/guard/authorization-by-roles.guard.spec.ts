import { TestBed } from '@angular/core/testing';

import { AuthorizationByRolesGuard } from './authorization-by-roles.guard';

describe('AuthorizationByRolesGuard', () => {
  let guard: AuthorizationByRolesGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthorizationByRolesGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
