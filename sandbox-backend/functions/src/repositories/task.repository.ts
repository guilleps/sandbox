import { BaseFirestoreRepository, getRepository } from "fireorm";
import { Task } from "../models/Task";
import { MarkTaskAsDone } from "../dto/task.dto";

// abstraemos la llamada/accesso a firestore
export class TaskRepository {
    private get repo(): BaseFirestoreRepository<Task> {
        return getRepository(Task); // solo cuando se necesita
    }

    async create(task: Partial<Task>): Promise<Task> { // partial para ignorar id
        return this.repo.create(task as Task);
    }

    async markDone(data: MarkTaskAsDone): Promise<Task> {
        const task = await this.repo.findById(data.taskId);
        task.done = data.done;
        return this.repo.update(task);
    }

    async delete(taskId: string): Promise<string> {
        await this.repo.delete(taskId);
        return `Task with id={${taskId}} has deleted`;
    }
}