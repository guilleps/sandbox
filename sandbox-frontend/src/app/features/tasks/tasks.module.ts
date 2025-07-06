import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskListComponent } from './components/task-list/task-list.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzTagModule } from "ng-zorro-antd/tag";
import { TaskFormComponent } from './components/task-form/task-form.component';
import { TaskService } from './services/task.service';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from "ng-zorro-antd/select";
import { ReactiveFormsModule } from '@angular/forms';
import { VisualGraphicComponent } from './components/visual-graphic/visual-graphic.component';
import { NzGridModule } from 'ng-zorro-antd/grid';

@NgModule({
  declarations: [
    TaskListComponent,
    TaskFormComponent,
    VisualGraphicComponent
  ],
  imports: [
    CommonModule,
    NzCardModule,
    NzListModule,
    NzTagModule,
    NzFormModule,
    NzSelectModule,
    NzGridModule,
    ReactiveFormsModule,
  ],
  providers: [TaskService],
  exports: [TaskListComponent, TaskFormComponent, VisualGraphicComponent]
})
export class TasksModule { }
