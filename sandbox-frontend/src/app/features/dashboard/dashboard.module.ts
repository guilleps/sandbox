import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from '@app/features/dashboard/dashboard.component';
import { UsersModule } from '@app/features/users/users.module';
import { TasksModule } from '@app/features/tasks/tasks.module';
import { RouterModule } from '@angular/router';
import { dashboardRoutes } from '@app/features/dashboard/dashboard.routes';

@NgModule({
	declarations: [DashboardComponent],
	imports: [RouterModule.forChild(dashboardRoutes), CommonModule, UsersModule, TasksModule],
})
export class DashboardModule {}
