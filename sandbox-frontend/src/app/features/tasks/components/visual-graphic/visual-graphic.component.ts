import { ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { UserList } from "../../../users/dto/user-list.dto";
import { Bar } from "@antv/g2plot";
import { Subscription } from "rxjs";
import { EventBusService } from "../../../../core/event-bus/event-bus.service";
import { UserService } from "../../../users/services/user.service";
import { UserDTO } from "../../../users/dto/user.dto";

@Component({
  selector: 'app-visual-graphic',
  standalone: false,
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
