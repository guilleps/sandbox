import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { UserList } from '../../../users/dto/user-list.dto';
import { UserService } from '../../../users/services/user.service';

@Component({
  selector: 'app-task-form',
  standalone: false,
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})
export class TaskFormComponent {
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