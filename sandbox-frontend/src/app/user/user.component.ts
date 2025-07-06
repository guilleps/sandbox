import { Component } from '@angular/core';
import { CreateUserDTO } from '../dto/create-user.dto';
import { UserService } from '../services/user.service';
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzCardModule } from "ng-zorro-antd/card";
import { NzDividerModule } from "ng-zorro-antd/divider";
import { NzFormModule } from "ng-zorro-antd/form";
import { UserListComponent } from "../user-list/user-list.component";
import { VisualGraphicComponent } from "../visual-graphic/visual-graphic.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EventBusService } from '../event-bus.service';

@Component({
  selector: 'app-user',
  imports: [NzButtonModule, NzCardModule, NzFormModule, NzDividerModule, UserListComponent, VisualGraphicComponent, CommonModule, FormsModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  form: CreateUserDTO = { name: '', email: '' };
  created: any;

  constructor(
    private userService: UserService,
    private eventBus: EventBusService
  ) { }

  saveUser() {
    this.userService.createUser(this.form).subscribe((user) => {
      this.created = user;
      this.form = { name: '', email: '' }

      this.eventBus.emit('userCreated', user)
      console.log('[EMIT] Usuario creado:', user);
    })
  }

}
