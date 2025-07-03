import { Component } from '@angular/core';
import { emit } from 'process';
import { CreateUserDTO } from 'src/dto/create-user.dto';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  form: CreateUserDTO = { name: '', email: '' };
  created: any;

  constructor(private userService: UserService) { }

  saveUser() {
    this.userService.createUser(this.form).subscribe((user) => {
      this.created = user;
      this.form = { name: '', email: '' }
    })
  }

}
