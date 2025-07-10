import { BaseFirestoreRepository, getRepository } from "fireorm";
import { Task } from "../models/Task";

/**
 * Repositorio que abstrae el acceso a la colección de tareas en Firestore(FireORM)
 */
export class TaskRepository {
	/**
	 * Metodo getter(privado) que retorna una instancia del repositorio tipado de FireORM para Task
	 * Se activa la carga perezosa (solo cuando se necesita)
	 */
    private get repo(): BaseFirestoreRepository<Task> {
        return getRepository(Task);
    }

	/**
	 * Crea una nueva tarea
	 *
	 * @param {Partial<Task>} task - Objeto parcial de tipo Task (evitamos ID debido a su generación automatica)
	 * @returns {Promise<Task>} Respuesta/retorno de tipo Promesa que resuelve con la tarea creada
	 *
	 * @example taskRepository.create({ title: 'Leer libro', done: false });
	 */
    create(task: Partial<Task>): Promise<Task> {
        return this.repo.create(task as Task);
    }

	/**
	 * Marca una tarea como completada/incompleta
	 *
	 * @param {string} taskId - ID de la tarea a actualizar.
	 * @param {boolean} done - Estado de la tarea (true para completada, false para pendiente)
	 * @returns {Promise<Task>} Respuesta/retorno de tipo Promesa que resuelve con la tarea actualizada
	 *
	 * @example taskRepository.markDone('412', true);
	 */
    async markDone(taskId: string, done: boolean): Promise<Task> {
        const task = await this.repo.findById(taskId);
        task.done = done;
        return this.repo.update(task);
    }

	/**
	 * Elimina una tarea segun su ID
	 *
	 * @param {string} taskId - ID de la tarea a eliminar.
	 * @returns {Promise<string>} Respuesta/retorno de tipo Promesa que resuelve con un mensaje de confirmación
	 *
	 * @example taskRepository.delete('abc123');
	 */
    async delete(taskId: string): Promise<string> {
        await this.repo.delete(taskId);
        return `Task with id={${taskId}} has deleted`;
    }
}