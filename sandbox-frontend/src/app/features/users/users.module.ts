import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from './services/user.service';
import { TasksModule } from '../tasks/tasks.module';
import { SharedModule } from '@app/features/shared/shared.module';

@NgModule({
	declarations: [UserFormComponent, UserListComponent],
	imports: [CommonModule, ReactiveFormsModule, TasksModule, SharedModule],
	providers: [UserService],
	exports: [UserFormComponent, UserListComponent],
})
export class UsersModule {}
