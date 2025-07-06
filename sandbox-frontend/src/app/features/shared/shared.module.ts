import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../users/services/user.service';
import { TaskService } from '../tasks/services/task.service';



@NgModule({
  imports: [CommonModule],
  providers: [UserService, TaskService]
})
export class SharedModule { }
