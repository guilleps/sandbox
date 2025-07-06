import { Component, Input, OnChanges } from '@angular/core';
import { TaskListDTO } from '../../dto/task-list.dto';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-list',
  standalone: false,
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnChanges {
  @Input() userId: string = '';
  tasks: TaskListDTO[] = [];

  constructor(private taskService: TaskService) { }

  ngOnChanges(): void {
    this.taskService.getTasksByUser(this.userId).subscribe((data) => {
      this.tasks = data;
    });
  }

}