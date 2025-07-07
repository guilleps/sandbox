import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskListComponent } from './components/task-list/task-list.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { TaskService } from './services/task.service';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { TaskChartComponent } from './components/task-chart/task-chart.component';

@NgModule({
	declarations: [TaskListComponent, TaskFormComponent, TaskChartComponent],
	imports: [
		CommonModule,
		NzButtonModule,
		NzIconModule,
		NzCardModule,
		NzCheckboxModule,
		NzListModule,
		NzTagModule,
		NzFormModule,
		NzSelectModule,
		NzGridModule,
		ReactiveFormsModule,
		FormsModule,
	],
	providers: [TaskService],
	exports: [TaskListComponent, TaskFormComponent, TaskChartComponent],
})
export class TasksModule {}
