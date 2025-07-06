import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { map, Observable } from 'rxjs';
import { TaskDTO } from '../dto/task.dto';
import { CreateTaskDTO } from '../dto/creat-task.dto';

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
            done: task.done,
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
}