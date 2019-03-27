import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { UserService } from '../../user-service/user-service.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users: any = environment.USERS;

  constructor( private userService: UserService ) { }

  ngOnInit() { }

  sendUser(id) {
    this.userService.sendUserValues(id);
  }
}
