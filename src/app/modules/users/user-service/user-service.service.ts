import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  selectedUser: Subject<any> = new Subject();
  selectedUser$ = this.selectedUser.asObservable();

  constructor() { }

  sendUserValues(data: any) {
    this.selectedUser.next(data);
  }
}
