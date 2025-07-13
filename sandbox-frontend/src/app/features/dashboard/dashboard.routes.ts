import { Routes } from '@angular/router';
import { DashboardComponent } from '@app/features/dashboard/dashboard.component';

export const dashboardRoutes: Routes = [
	{
		path: '',
		component: DashboardComponent,
	},
	{
		path: '**',
		redirectTo: '',
	},
];
