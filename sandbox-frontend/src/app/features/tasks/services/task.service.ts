import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { map, Observable } from 'rxjs';
import { TaskDTO } from '../dto/task.dto';
import { CreateTaskDTO } from '../dto/creat-task.dto';
import { TaskDoneDTO } from '../dto/task-done.dto';

@Injectable()
export class TaskService {
  constructor(private apollo: Apollo) { }

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
            assignedToUserId: task.assignedToUserId
          }
        }
      }).pipe(map(res => res.data!.createTask));
  };

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
      .valueChanges.pipe(map((result) => result.data.taskByUser));
  }

  markTaskById(taskId: string, done: boolean): Observable<TaskDoneDTO> {
    const MARK_TASK = gql`
    mutation MarkTaskAsDone($data: MarkTaskAsDone!) {
      markTaskAsDone(data: $data) {
        id
        title
        done
      }
    }`;

    return this.apollo.mutate<{ markTaskAsDone: TaskDoneDTO }>({
      mutation: MARK_TASK,
      variables: { data: { taskId, done } }
    })
    .pipe(map(res => res.data!.markTaskAsDone));
  }
}