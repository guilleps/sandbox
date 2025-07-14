import { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: '',
		loadChildren: () =>
			import('./features/dashboard/dashboard.module').then(m => m.DashboardModule),
	},
	{
		path: '',
		redirectTo: 'user-tasks',
		pathMatch: 'full',
	},
	{
		path: '**',
		redirectTo: 'user-tasks',
	},
];
