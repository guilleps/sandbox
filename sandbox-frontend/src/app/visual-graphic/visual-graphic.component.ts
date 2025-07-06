import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Bar } from "@antv/g2plot";
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzListModule } from 'ng-zorro-antd/list';
import { UserList } from '../dto/user-list.dto';
import { UserService } from '../services/user.service';
import { TaskComponent } from "../task/task.component";
import { EventBusService } from '../event-bus.service';
import { UserDTO } from '../dto/user.dto';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-visual-graphic',
  imports: [NzCardModule, NzListModule, TaskComponent],
  templateUrl: './visual-graphic.component.html',
  styleUrl: './visual-graphic.component.css'
})
export class VisualGraphicComponent implements OnInit, OnDestroy {
  users!: UserList[];
  barPlot: Bar | undefined;
  private subscriptions = new Subscription();

  constructor(
    private eventBus: EventBusService,
    private userService: UserService,
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadUsers();

    const sub = this.eventBus.on<UserDTO>('userCreated').subscribe((nuevoUsuario) => {
      console.log('[ON] Evento userCreated recibido en VISUAL:', nuevoUsuario);
      this.loadUsers();
    })
    this.subscriptions.add(sub);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  loadUsers(): void {
    this.userService.getAllUsersAndTasks() // consumimos el servicio UserService
      // y es una llamada al pendiente
      // en la espera de un resultado de una llamada asincronica
      .subscribe((usrs) => {
        console.log('usrs', usrs);
        this.users = usrs.map((u) => ({
          ...u,
          tasks: Array.isArray(u.tasks) ? [...u.tasks] : []
        }));
        this.renderChart();
        this.cdRef.detectChanges();
      });
  }

  renderChart(): void {
    if (!this.users || this.users.length === 0) return;

    const data = this.users.map(u => ({
      name: u.user.name,
      taskCount: u.tasks.length,
    }));
    console.log('[Chart] Datos actualizados ANTES DE ELSE', data);

    if (!this.barPlot) {
      this.barPlot = new Bar('container', {
        data,
        xField: 'taskCount',
        yField: 'name',
        meta: {
          taskCount: { alias: 'Total de tareas' }
        },
        label: { position: 'middle', style: { fill: '#fff' } },
      });
      this.barPlot.render();
    } else {
      this.barPlot.changeData(data);
      console.log('[Chart] Datos actualizados DESPUES DE ELSE:', data);
    }
  }

  getTaskDescription(user: any): string {
    if (!user.tasks || user.tasks.length === 0) {
      return 'Ninguna tarea asignada';
    }
    return 'Tareas: ' + user.tasks.map((t: any) => t.title).join(', ');
  }

}