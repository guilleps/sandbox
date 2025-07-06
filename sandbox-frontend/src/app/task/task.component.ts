import { Component } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from "ng-zorro-antd/select";
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { UserList } from '../dto/user-list.dto';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-task',
  imports: [NzButtonModule, NzCardModule, NzFormModule, ReactiveFormsModule, NzSelectModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {
  taskForm: FormGroup;
  users: UserList[] = [];

  constructor(
    private taskService: TaskService,
    private userService: UserService,
    private fb: FormBuilder
  ) {
    this.taskForm = this.fb.group({
      userId: [null, Validators.required],
      title: ['', Validators.required],
      description: [''], // debe ser opcional
    });

    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getAllUsersAndTasks().subscribe((data) => {
      this.users = data;
    });
  }

  assignTask(): void {
    const { userId, title, description } = this.taskForm.value;
    console.log('taskform', { userId, title, description });

    this.taskService.createTask({
      title,
      description,
      done: false,
      assignedToUserId: userId
    }).subscribe({
      next: (res) => {
        console.log('Tarea creada', res.id);
        this.taskForm.reset();
        this.loadUsers();
      },
      error: (err) => console.error("No se creó la tarea, [ERROR]")
    })
  }

}
