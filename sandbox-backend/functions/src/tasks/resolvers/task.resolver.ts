import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Task } from "../models/Task";
import { TaskRepository } from "../repositories/task.repository";
import { CreateTask } from "../dto/create-task.dto";
import { MarkTaskAsDone } from "../dto/mark-task.dto";
import { DeleteTask } from "../dto/delete-task.dto";

@Resolver(() => Task)
export class TaskResolver {
    private readonly taskRepo = new TaskRepository();

    @Query(() => [Task])
    taskByUser(@Arg("userId") userId: string): Promise<Task[]> {
        return this.taskRepo["repo"].whereEqualTo("assignedToUserId", userId).find();
    }

    @Mutation(() => Task)
    createTask(@Arg("data") data: CreateTask): Promise<Task> {
      return this.taskRepo.create(data);
    }
  
    @Mutation(() => Task)
    markTaskAsDone(@Arg("data") data: MarkTaskAsDone): Promise<Task> {
      return this.taskRepo.markDone(data.taskId, data.done);
    }
  
    @Mutation(() => String)
    deleteTask(@Arg("data") data: DeleteTask): Promise<string> {
      return this.taskRepo.delete(data.taskId);
    }
}

// import { CreateTask, DeleteTask, MarkTaskAsDone } from "../graphql/dto/task.dto";
// import { Task } from "../models/Task";
// import { TaskRepository } from "../repositories/task.repository";

// const taskRepo = new TaskRepository();

// // lo que realmente debe hacer una query o mutation
// export const taskResolvers = {
//     Query: {
//         taskByUser: async (_parent: unknown, args: { userId: string }): Promise<Task[]> => {
//             const allTasks = await taskRepo["repo"].whereEqualTo("assignedToUserId", args.userId).find();
//             return allTasks;
//         }
//     },
//     Mutation: {
//         createTask: async (_parent: unknown, args: CreateTask): Promise<Task> => {
//             return taskRepo.create(args);
//         },
//         markTaskAsDone: async (_: unknown, args: MarkTaskAsDone): Promise<Task> => {
//           return taskRepo.markDone(args.taskId);
//         },
//         deleteTask: async (_: unknown, args: DeleteTask): Promise<string> => {
//           return taskRepo.delete(args.taskId);
//         }
//     },
// };
