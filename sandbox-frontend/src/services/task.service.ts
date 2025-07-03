import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor(private apollo: Apollo) { }

  getTasksByUser(userId: String): Observable<any[]> {
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
      .watchQuery<{ taskByUser: any[] }>({
        query: GET_TASKS,
        variables: { userId },
      })
      .valueChanges.pipe(map((result) => result.data.taskByUser));
  }
}