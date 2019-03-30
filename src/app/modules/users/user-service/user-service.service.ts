import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  /**
   * selected subject
   * @type {Subject<any>}
   * @memberof UserService
   */
  selectedUser: Subject<any> = new Subject();

  /**
   * subscribe stream to get user
   * @memberof UserService
   */
  selectedUser$ = this.selectedUser.asObservable();

  constructor() { }

  /**
   * Sends user to subscribe stream
   * @param {*} data
   * @memberof UserService
   */
  sendUserValues(data: any) {
    this.selectedUser.next(data);
  }
}
