import { TestBed } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

import { UserService } from './user-service.service';

const MockCountriesList = [
  { name: 'Afghanistan' },
  { name: 'Åland Islands' },
  { name: 'Albania' },
  { name: 'Algeria' }
];

describe('UserService', () => {
  let httpMock: HttpTestingController;
  let userService: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ UserService ]
    });

    userService = TestBed.get(UserService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    const service: UserService = TestBed.get(UserService);
    expect(service).toBeTruthy();
  });

  it('getCountries() should http GET countries list', () => {
    const countries = MockCountriesList;

    userService.getCountries().subscribe((res) => {
      expect(res).toEqual(countries);
    });

    const req = httpMock.expectOne('http://localhost:4200/assets/countries.json');
    expect(req.request.method).toEqual('GET');
    req.flush(countries);

    httpMock.verify();
  });

  it('sendUserValues() should emit data to selectedUser Subject', () => {
    userService.selectedUser.subscribe((res) => {
      expect(res).toEqual('test');
    });
    userService.sendUserValues('test');
  });
});
