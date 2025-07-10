import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { map, Observable } from 'rxjs';
import { TaskDTO } from '../dto/task.dto';
import { CreateTaskDTO } from '../dto/creat-task.dto';
import { TaskDoneDTO } from '../dto/task-done.dto';

/**
 * Servicio encargado de la gestión de tareas mediante Apollo&graphql
 */
@Injectable()
export class TaskService {
	constructor(private apollo: Apollo) {}

	/**
	 * Crea una tarea nueva asignada a un usuario
	 *
	 * @param {CreateTaskDTO} task - Objeto que contiene los datos necesarios para crear la tarea (título, descripción y ID del usuario asignado)
	 * @returns {Observable<TaskDTO>} Observable que emite la tarea recién creada
	 *
	 * @example taskService.createTask({ title: 'Desplegar backend', description: 'Hacerlo con terraform', assignedToUserId: '133' })
	 *   			.subscribe(task => console.log(task.id));
	 */
	createTask(task: CreateTaskDTO): Observable<TaskDTO> {
		const CREATE_TASK = gql`
			mutation CreateTask($data: CreateTask!) {
				createTask(data: $data) {
					id
					title
					description
					done
					assignedToUserId
				}
			}
		`;

		return this.apollo
			.mutate<{ createTask: TaskDTO }>({
				mutation: CREATE_TASK,
				variables: {
					data: {
						title: task.title,
						description: task.description,
						assignedToUserId: task.assignedToUserId,
					},
				},
			})
			.pipe(map(res => res.data!.createTask));
	}

	/**
	 * Obtiene todas las tareas asignadas a un usuario especifico
	 *
	 * @param {string} userId - ID del usuario cuyas tareas se desean obtener
	 * @returns {Observable<TaskDTO[]>} Observable que emite un arreglo con las tareas del usuario
	 *
	 * @example taskService.getTasksByUser('133').subscribe(tasks => console.log(tasks.length));
	 */
	getTasksByUser(userId: string): Observable<TaskDTO[]> {
		const GET_TASKS = gql`
			query TaskByUser($userId: String!) {
				taskByUser(userId: $userId) {
					id
					title
					description
					done
					assignedToUserId
				}
			}
		`;

		return this.apollo
			.watchQuery<{ taskByUser: TaskDTO[] }>({
				query: GET_TASKS,
				variables: { userId },
			})
			.valueChanges.pipe(map(result => result.data.taskByUser));
	}

	/**
	 * Marca una tarea como completada/incompleta
	 *
	 * @param {string} taskId - ID de la tarea a actualizar
	 * @param {boolean} done - Estado de finalización de la tarea (true = completada)
	 * @returns {Observable<TaskDoneDTO>} Observable que emite la tarea actualizada con el nuevo estado
	 *
	 * @example taskService.markTaskById('133', true).subscribe(task => console.log(task.done));
	 */
	markTaskById(taskId: string, done: boolean): Observable<TaskDoneDTO> {
		const MARK_TASK = gql`
			mutation MarkTaskAsDone($data: MarkTaskAsDone!) {
				markTaskAsDone(data: $data) {
					id
					title
					done
				}
			}
		`;

		return this.apollo
			.mutate<{ markTaskAsDone: TaskDoneDTO }>({
				mutation: MARK_TASK,
				variables: { data: { taskId, done } },
			})
			.pipe(map(res => res.data!.markTaskAsDone));
	}
}
