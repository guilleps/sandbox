import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDividerModule } from "ng-zorro-antd/divider";
import { NzFormModule } from "ng-zorro-antd/form";
import { FormsModule } from '@angular/forms';
import { NzListModule } from 'ng-zorro-antd/list';
import { UserService } from './services/user.service';
import { TasksModule } from "../tasks/tasks.module";
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzInputModule } from "ng-zorro-antd/input";
import { NzIconModule } from "ng-zorro-antd/icon";

@NgModule({
  declarations: [
    UserFormComponent,
    UserListComponent
  ],
  imports: [
    CommonModule,
    NzInputModule,
    NzButtonModule,
    NzIconModule,
    NzCardModule,
    NzFormModule,
    NzDividerModule,
    FormsModule,
    NzListModule,
    NzGridModule,
    TasksModule
  ],
  providers: [UserService]
})
export class UsersModule { }
