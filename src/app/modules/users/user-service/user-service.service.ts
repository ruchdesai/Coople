import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  selectedUser: Subject<any> = new Subject();
  selectedUser$ = this.selectedUser.asObservable();

  constructor(
    private http: HttpClient
  ) { }

  sendUserValues(data: any) {
    this.selectedUser.next(data);
  }

  getCountries(): Observable<any> {
    return this.http.get(environment.API_URL + 'countries.json');
  }
}
