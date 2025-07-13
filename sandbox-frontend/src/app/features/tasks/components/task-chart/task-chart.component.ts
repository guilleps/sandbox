import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { UserList } from '../../../users/dto/user-list.dto';
import { Bar } from '@antv/g2plot';
import { Subscription } from 'rxjs';
import { EventBusService } from '@app/core/event-bus/event-bus.service';
import { UserService } from '@app/features/users/services/user.service';

@Component({
	selector: 'app-task-chart',
	standalone: false,
	templateUrl: './task-chart.component.html',
	styleUrl: './task-chart.component.css',
})
export class TaskChartComponent implements OnInit, OnDestroy {
	users!: UserList[];
	barPlot: Bar | undefined;
	private subscriptions = new Subscription();

	constructor(
		private eventBus: EventBusService,
		private userService: UserService,
		private cdRef: ChangeDetectorRef,
	) {}

	ngOnInit(): void {
		this.loadUsers();

		const sub = this.eventBus.on('userCreated').subscribe(() => {
			this.loadUsers();
		});
		this.subscriptions.add(sub);
	}

	ngOnDestroy(): void {
		this.subscriptions.unsubscribe();
	}

	loadUsers(): void {
		this.userService
			.getAllUsersAndTasks() // consumimos el servicio UserService
			// y es una llamada al pendiente
			// en la espera de un resultado de una llamada asincronica
			.subscribe(usrs => {
				this.users = usrs.map(u => ({
					...u,
					tasks: Array.isArray(u.tasks) ? [...u.tasks] : [],
				}));
				this.renderChart();
				this.cdRef.detectChanges();
			});
	}

	renderChart(): void {
		if (!this.users || this.users.length === 0) return;

		const data = this.users.flatMap(u => [
			{
				name: u.user.name,
				type: 'Pendientes',
				count: u.tasks.filter(t => !t.done).length,
			},
			{
				name: u.user.name,
				type: 'Completadas',
				count: u.tasks.filter(t => t.done).length,
			},
		]);

		if (!this.barPlot) {
			this.barPlot = new Bar('container', {
				data,
				isStack: true,
				xField: 'count',
				yField: 'name',
				seriesField: 'type',
				meta: { count: { alias: 'Total de tareas' }, type: { alias: 'Estado' } },
				color: ['#34E084', '#3468E0'],
				barStyle: {
					textAlign: 'center',
					fontSize: 18,
				},
				label: {
					position: 'middle',
					style: {
						fill: 'black',
					},
					content: ({ count }) => (count ? String(count) : ''),
					layout: [{ type: 'hide-overlap' }],
				},
			});
			this.barPlot.render();
		} else {
			this.barPlot.changeData(data);
		}
	}
}
