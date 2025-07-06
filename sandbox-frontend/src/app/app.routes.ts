import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { UserFormComponent } from './features/users/components/user-form/user-form.component';

export const routes: Routes = [
    {
        path: '', 
        title: 'home',
        component: AppComponent
    },
    {
        path: 'user-tasks',
        component: UserFormComponent
    }
];
