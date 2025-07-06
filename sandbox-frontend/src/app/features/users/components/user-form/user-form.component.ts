import { Component } from '@angular/core';
import { CreateUserDTO } from '../../dto/create-user.dto';
import { UserService } from '../../services/user.service';
import { EventBusService } from '../../../../core/event-bus/event-bus.service';

@Component({
  selector: 'app-user-form',
  standalone: false,
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent {
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