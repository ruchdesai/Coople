import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { UserService } from '../../user-service/user-service.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  /**
   * Mock users list
   * @type {*}
   * @memberof UserListComponent
   */
  users: any = environment.USERS;

  constructor( private userService: UserService ) { }

  ngOnInit() { }

  /**
   * Sends user data to user service
   * @param {*} user
   * @memberof UserListComponent
   */
  sendUser(user) {
    this.userService.sendUserValues(user);
  }
}
