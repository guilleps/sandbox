import { Routes } from '@angular/router';
import { UserFormComponent } from '@app/features/users/components/user-form/user-form.component';

export const userRoutes: Routes = [
	{
		path: '',
		component: UserFormComponent,
	},
	{
		path: '**',
		redirectTo: '',
	},
];
