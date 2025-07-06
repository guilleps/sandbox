import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { UserDTO } from '../dto/user.dto';
import { UserService } from '../services/user.service';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzListModule } from 'ng-zorro-antd/list';
import { TaskListComponent } from "../task-list/task-list.component";
import { Subscription } from 'rxjs';
import { EventBusService } from '../event-bus.service';

@Component({
  selector: 'app-user-list',
  imports: [NzCardModule, NzListModule, TaskListComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit, OnDestroy {
  users: UserDTO[] = [];
  selectedUserId: string = '';
  private subscriptions = new Subscription();

  constructor(
    private userService: UserService,
    private eventBus: EventBusService,
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadUsers();

    const sub = this.eventBus.on<UserDTO>('userCreated').subscribe((nuevoUsuario) => {
      // console.log('[ON] Evento userCreated recibido en USER-LIST:', nuevoUsuario);
      this.loadUsers();
    })
    this.subscriptions.add(sub);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe((usrs) => {
      this.users = usrs;
      // console.log('[loadUsers] Usuarios actualizados:', this.users);
      this.cdRef.detectChanges();
    });
  }

  viewTasks(userId: string) {
    this.selectedUserId = userId;
  }

}
