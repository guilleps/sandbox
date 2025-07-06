import { Routes } from '@angular/router';
import { UserFormComponent } from './features/users/components/user-form/user-form.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'user-tasks',
        pathMatch: 'full'
    },
    {
        path: 'user-tasks',
        component: UserFormComponent
    },
    {
        path: '**',
        redirectTo: 'user-tasks'
    }
];