import { Component, OnDestroy, OnInit } from '@angular/core';
import { TaskListDTO } from '../../dto/task-list.dto';
import { TaskService } from '../../services/task.service';
import { EventBusService } from '@app/core/event-bus/event-bus.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-task-list',
	standalone: false,
	templateUrl: './task-list.component.html',
	styleUrl: './task-list.component.css',
})
export class TaskListComponent implements OnInit, OnDestroy {
	tasks: TaskListDTO[] = [];
	userId?: string;
	private subscriptions = new Subscription();

	constructor(
		private eventBus: EventBusService,
		private taskService: TaskService,
	) {}

	ngOnInit(): void {
		const sub = this.eventBus.on('userSelected').subscribe(event => {
			this.userId = event.id;
			this.loadTasks(event.id);
		});

		this.subscriptions.add(sub);
	}

	ngOnDestroy(): void {
		this.subscriptions.unsubscribe();
	}

	loadTasks(id: string) {
		return this.taskService.getTasksByUser(id).subscribe(data => {
			this.tasks = data ?? [];
		});
	}

	onToggle(task: TaskListDTO): void {
		const nuevoEstado = !task.done;

		this.taskService.markTaskById(task.id, nuevoEstado).subscribe({
			next: res => {
				this.tasks = this.tasks.map(t => (t.id === task.id ? { ...t, done: res.done } : t));
			},
			error: err => {
				console.error('Error al cambiar estado:', err);
			},
		});
	}
}
