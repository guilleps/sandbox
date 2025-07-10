import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Task } from "../models/Task";
import { TaskRepository } from "../repositories/task.repository";
import { CreateTask } from "../dto/create-task.dto";
import { MarkTaskAsDone } from "../dto/mark-task.dto";
import { DeleteTask } from "../dto/delete-task.dto";

/**
 * Actua como controller, expone las operaciones(query & mutation) del sistema
 * Usa TaskRepository para acceder a la capa de datos con Firestore(FireORM)
 */
@Resolver(() => Task)
export class TaskResolver {
	private readonly taskRepo = new TaskRepository();

  /**
   * Consulta las tareas asignadas a un usuario específico
   *
   * @param {string} userId - ID del usuario cuyas tareas se desean obtener
   * @returns {Promise<Task[]>} Lista de tareas asignadas al usuario
   *
   * @example
   * query {
   *   taskByUser(userId: "abc123") {
   *     id
   *     title
   *     done
   *   }
   * }
   */
  @Query(() => [Task])
  taskByUser(@Arg("userId") userId: string): Promise<Task[]> {
    return this.taskRepo["repo"].whereEqualTo("assignedToUserId", userId).find();
  }

  /**
   * Crea una nueva tarea
   *
   * @param {CreateTask} data - Objeto con los datos necesarios para crear la tarea
   * @returns {Promise<Task>} La tarea creada
   *
   * @example
   * mutation {
   *   createTask(data: { title: "Leer libro", description: "Capítulo 5", assignedToUserId: "abc123" }) {
   *     id
   *     title
   *   }
   * }
   */
  @Mutation(() => Task)
  createTask(@Arg("data") data: CreateTask): Promise<Task> {
    return this.taskRepo.create(data);
  }

  /**
   * Marca una tarea como completada o no completada
   *
   * @param {MarkTaskAsDone} data - Contiene el ID de la tarea y el estado deseado
   * @returns {Promise<Task>} La tarea actualizada con el nuevo estado
   *
   * @example
   * mutation {
   *   markTaskAsDone(data: { taskId: "abc123", done: true }) {
   *     id
   *     done
   *   }
   * }
   */
  @Mutation(() => Task)
  markTaskAsDone(@Arg("data") data: MarkTaskAsDone): Promise<Task> {
    return this.taskRepo.markDone(data.taskId, data.done);
  }

  /**
   * Elimina una tarea del sistema según su ID.
   *
   * @param {DeleteTask} data - Contiene el ID de la tarea a eliminar
   * @returns {Promise<string>} Mensaje de confirmación de la eliminación.
   *
   * @example
   * mutation {
   *   deleteTask(data: { taskId: "abc123" })
   * }
   */
  @Mutation(() => String)
  deleteTask(@Arg("data") data: DeleteTask): Promise<string> {
    return this.taskRepo.delete(data.taskId);
  }
}
