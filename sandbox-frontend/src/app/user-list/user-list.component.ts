import { Component, OnInit } from '@angular/core';
import { UserDTO } from 'src/dto/user.dto';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: UserDTO[] = [];
  selectedUserId: string = '';

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loadUsers();

    this.userService.userCreatedObservable.subscribe(() => {
      this.loadUsers();
    })
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe((usrs) => {
      this.users = usrs;
    });
  }

  viewTasks(userId: string) {
    this.selectedUserId = userId;
  }

}
