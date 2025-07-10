import { Component } from '@angular/core';
import { CreateTaskDTO } from '../../dto/creat-task.dto';
import { TaskService } from '../../services/task.service';
import { UserList } from '@app/features/users/dto/user-list.dto';
import { UserService } from '@app/features/users/services/user.service';

@Component({
	selector: 'app-task-form',
	standalone: false,
	templateUrl: './task-form.component.html',
	styleUrl: './task-form.component.css',
})
export class TaskFormComponent {
	taskForm: CreateTaskDTO = { title: '', description: '', assignedToUserId: '' };
	users: UserList[] = [];

	constructor(
		private taskService: TaskService,
		private userService: UserService,
	) {
		this.loadUsers();
	}

	loadUsers(): void {
		this.userService.getAllUsersAndTasks().subscribe({
			next: data => {
				this.users = data;
			},
			error: err => {
				console.error('Error al cargar usuarios:', err);
			},
		});
	}

	assignTask(): void {
		const { assignedToUserId, title, description } = this.taskForm;

		if (!assignedToUserId || !title) {
			console.warn('Formulario inválido');
			return;
		}

		this.taskService
			.createTask({
				title,
				description,
				assignedToUserId,
			})
			.subscribe({
				next: res => {
					console.log('Tarea creada', res);
					this.taskForm = { title: '', description: '', assignedToUserId: '' };
					this.loadUsers();
				},
				error: err => console.error('No se creó la tarea, [ERROR]=', err),
			});
	}
}
