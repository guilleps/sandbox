import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { TaskService } from './services/task.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaskChartComponent } from './components/task-chart/task-chart.component';
import { SharedModule } from '@app/features/shared/shared.module';

@NgModule({
	declarations: [TaskListComponent, TaskFormComponent, TaskChartComponent],
	imports: [CommonModule, ReactiveFormsModule, FormsModule, SharedModule],
	providers: [TaskService],
	exports: [TaskListComponent, TaskFormComponent, TaskChartComponent],
})
export class TasksModule {}
