import { Component, Input, OnChanges } from '@angular/core';
import { TaskListDTO } from '../dto/task-list.dto';
import { TaskService } from '../services/task.service';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzListModule } from "ng-zorro-antd/list";
import { NzTagModule } from "ng-zorro-antd/tag";

@Component({
  selector: 'app-task-list',
  imports: [NzCardModule, NzListModule, NzTagModule],
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