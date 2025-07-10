import { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: 'user-tasks',
		loadChildren: () => import('./features/users/users.module').then(m => m.UsersModule),
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
