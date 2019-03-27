import { Component, OnInit } from '@angular/core';
import { UserService } from './user-service/user-service.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  user: any;

  constructor(private userService: UserService) {
    this.getUser();
  }

  ngOnInit() {}

  getUser() {
    this.userService.selectedUser$.subscribe((data) => {
      this.user = data;
    });
  }
}
