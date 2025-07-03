import { BaseFirestoreRepository, getRepository } from "fireorm";
import { Task } from "../models/Task";

// abstraemos la llamada/accesso a firestore
export class TaskRepository {
    private get repo(): BaseFirestoreRepository<Task> {
        return getRepository(Task); // solo cuando se necesita
    }

    async create(task: Partial<Task>): Promise<Task> { // partial para ignorar id
        return this.repo.create(task as Task);
    }

    async markDone(taskId: string): Promise<Task> {
        const task = await this.repo.findById(taskId);
        task.done = true;
        return this.repo.update(task);
    }

    async delete(taskId: string): Promise<string> {
        await this.repo.delete(taskId);
        return `Task with id={${taskId}} has deleted`;
    }
}