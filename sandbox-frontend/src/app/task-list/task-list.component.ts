import { Component, Input, OnChanges } from '@angular/core';
import { TaskListDTO } from 'src/dto/task-list.dto';
import { TaskService } from 'src/services/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
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
