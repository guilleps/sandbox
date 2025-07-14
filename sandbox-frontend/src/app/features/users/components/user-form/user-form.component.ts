import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventBusService } from '@app/core/event-bus/event-bus.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
	selector: 'app-user-form',
	standalone: false,
	templateUrl: './user-form.component.html',
	styleUrl: './user-form.component.css',
})
export class UserFormComponent {
	userForm!: FormGroup;

	constructor(
		private fb: FormBuilder,
		private userService: UserService,
		private eventBus: EventBusService,
		private message: NzMessageService,
	) {
		this.userForm = this.fb.group({
			name: ['', [Validators.required]],
			email: ['', [Validators.required, Validators.email]],
		});
	}

	saveUser() {
		if (this.userForm.invalid) {
			this.message.warning('Por favor complete los campos requeridos correctamente');
			return;
		}

		this.userService.createUser(this.userForm.value).subscribe({
			next: user => {
				this.message.success('Usuario creado exitosamente');
				this.eventBus.emit('userCreated', user);
				this.userForm.reset();
			},
			error: err => {
				console.error('No se creo el usuario, [ERROR]=', err);
				this.message.error('Error al asignar tarea');
			},
		});
	}
}
