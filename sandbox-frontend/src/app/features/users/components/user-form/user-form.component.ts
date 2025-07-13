import { Component } from '@angular/core';
import { UserDTO } from '../../dto/user.dto';
import { UserService } from '../../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventBusService } from '@app/core/event-bus/event-bus.service';

@Component({
	selector: 'app-user-form',
	standalone: false,
	templateUrl: './user-form.component.html',
	styleUrl: './user-form.component.css',
})
export class UserFormComponent {
	form!: FormGroup;
	created!: UserDTO;

	constructor(
		private fb: FormBuilder,
		private userService: UserService,
		private eventBus: EventBusService,
	) {
		this.form = this.fb.group({
			name: ['', [Validators.required]],
			email: ['', [Validators.required, Validators.email]],
		});
	}

	saveUser() {
		if (this.form.invalid) return;

		this.userService.createUser(this.form.value).subscribe(user => {
			this.created = user;
			this.form.reset();

			this.eventBus.emit('userCreated', user);
		});
	}
}
