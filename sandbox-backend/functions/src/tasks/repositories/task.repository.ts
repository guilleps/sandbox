import { BaseFirestoreRepository, getRepository } from 'fireorm';
import { Task } from '../models/Task';

/**
 * Repositorio que abstrae el acceso a la colección de tareas en Firestore(FireORM)
 */
export class TaskRepository {
	/**
	 * Metodo getter(privado) que retorna una instancia del repositorio tipado de FireORM para Task
	 * Se activa la carga perezosa (solo cuando se necesita)
	 */
	private get taskCollection(): BaseFirestoreRepository<Task> {
		return getRepository(Task);
	}

	/**
	 * Crea una nueva tarea
	 *
	 * @param {Partial<Task>} task - Objeto parcial de tipo Task (evitamos ID debido a su generación automatica)
	 * @returns {Promise<Task>} Respuesta/retorno de tipo Promesa que resuelve con la tarea creada
	 *
	 * @example taskRepository.createTask({ title: 'Leer libro', done: false });
	 */
	createTask(task: Partial<Task>): Promise<Task> {
		return this.taskCollection.create(task as Task);
	}

	/**
	 * Marca una tarea como completada/incompleta
	 *
	 * @param {string} taskId - ID de la tarea a actualizar.
	 * @param {boolean} done - Estado de la tarea (true para completada, false para pendiente)
	 * @returns {Promise<Task>} Respuesta/retorno de tipo Promesa que resuelve con la tarea actualizada
	 *
	 * @example taskRepository.updateTaskStatusById('412', true);
	 */
	async updateTaskStatusById(taskId: string, done: boolean): Promise<Task> {
		const task = await this.taskCollection.findById(taskId);
		task.done = done;
		return this.taskCollection.update(task);
	}

	/**
	 * Elimina una tarea segun su ID
	 *
	 * @param {string} taskId - ID de la tarea a eliminar.
	 * @returns {Promise<string>} Respuesta/retorno de tipo Promesa que resuelve con un mensaje de confirmación
	 *
	 * @example taskRepository.deleteTaskById('abc123');
	 */
	async deleteTaskById(taskId: string): Promise<string> {
		await this.taskCollection.delete(taskId);
		return `Task with id={${taskId}} has deleted`;
	}

	/**
	 * Busca un tareas por el userid.
	 *
	 * @param {string} userId - ID del usuario.
	 * @returns {Promise<Task>} Retorna una arreglo de todas las listas del usuario
	 *
	 * @example const userFounded = await taskRepo.findTasksByUserId("1223A");
	 */
	async findTasksByUserId(userId: string): Promise<Task[]> {
		const tasks = await this.taskCollection.whereEqualTo('assignedToUserId', userId).find();
		return tasks;
	}
}
