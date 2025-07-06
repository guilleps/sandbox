import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';

export const routes: Routes = [
    {
        path: '', 
        title: 'home',
        component: AppComponent
    },
    {
        path: 'user-tasks',
        component: UserComponent
    }
];
