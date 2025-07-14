import { Component, OnInit } from '@angular/core';
import { CreateTaskDTO } from '../../dto/creat-task.dto';
import { TaskService } from '../../services/task.service';
import { UserList } from '@app/features/users/dto/user-list.dto';
import { UserService } from '@app/features/users/services/user.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'app-task-form',
	standalone: false,
	templateUrl: './task-form.component.html',
	styleUrl: './task-form.component.css',
})
export class TaskFormComponent implements OnInit {
	isLoading = false;
	taskForm: FormGroup;
	users: UserList[] = [];

	constructor(
		private fb: FormBuilder,
		private taskService: TaskService,
		private userService: UserService,
		private message: NzMessageService,
	) {
		this.taskForm = this.fb.group({
			assignedToUserId: ['', Validators.required],
			title: ['', [Validators.required, Validators.maxLength(100)]],
			description: ['', Validators.maxLength(300)],
		});
	}

	ngOnInit(): void {
		this.loadUsers();
	}

	initials(name: string): string {
		return name
			.split(' ')
			.map(n => n[0])
			.join('')
			.toUpperCase();
	}

	loadUsers(): void {
		this.userService.getAllUsersAndTasks().subscribe({
			next: data => (this.users = data),
			error: err => console.error('Error al cargar usuarios:', err),
		});
	}

	assignTask(): void {
		if (this.taskForm.invalid) {
			this.message.warning('Por favor complete los campos requeridos correctamente');
			return;
		}

		this.isLoading = true;
		const formValue: CreateTaskDTO = this.taskForm.value;

		this.taskService.createTask(formValue).subscribe({
			next: () => {
				this.isLoading = false;
				this.message.success('Tarea asignada correctamente');
				this.taskForm.reset();
			},
			error: err => {
				this.isLoading = false;
				console.error('No se creo la tarea, [ERROR]=', err);
				this.message.error('Error al asignar tarea');
			},
		});
	}
}
