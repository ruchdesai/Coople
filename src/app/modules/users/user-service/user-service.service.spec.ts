import { TestBed } from '@angular/core/testing';

import { UserService } from './user-service.service';

describe('UserService', () => {
  let userService: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [ UserService ]
    });

    userService = TestBed.get(UserService);
  });

  it('should be created', () => {
    const service: UserService = TestBed.get(UserService);
    expect(service).toBeTruthy();
  });

  it('sendUserValues() should emit data to selectedUser Subject', () => {
    userService.selectedUser.subscribe((res) => {
      expect(res).toEqual('test');
    });
    userService.sendUserValues('test');
  });
});
