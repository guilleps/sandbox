import { Component, Input, OnChanges } from '@angular/core';
import { TaskListDTO } from '../../dto/task-list.dto';
import { TaskService } from '../../services/task.service';

@Component({
	selector: 'app-task-list',
	standalone: false,
	templateUrl: './task-list.component.html',
	styleUrl: './task-list.component.css',
})
export class TaskListComponent implements OnChanges {
	@Input() userId = '';
	tasks: TaskListDTO[] = [];

	constructor(private taskService: TaskService) {}

	ngOnChanges(): void {
		this.taskService.getTasksByUser(this.userId).subscribe(data => {
			this.tasks = data;
		});
	}

	onToggle(task: TaskListDTO): void {
		const nuevoEstado = !task.done;

		this.taskService.markTaskById(task.id, nuevoEstado).subscribe({
			next: res => {
				this.tasks = this.tasks.map(t => (t.id === task.id ? { ...t, done: res.done } : t));
				console.log('Estado actualizado:', res);
			},
			error: err => {
				console.error('Error al cambiar estado:', err);
			},
		});
	}
}
