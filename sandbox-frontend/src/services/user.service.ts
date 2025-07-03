import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { CreateUserDTO } from 'src/dto/create-user.dto';
import { UserDTO } from 'src/dto/user.dto';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userCreated$ = new Subject<void>();

  constructor(private apollo: Apollo) { }

  get userCreatedObservable() {
    return this.userCreated$.asObservable();
  }

  createUser(user: CreateUserDTO): Observable<UserDTO> {
    const CREATE_USER = gql`
      mutation CreateUser($name: String!, $email: String!) {
        createUser(data: { name: $name, email: $email }) {
          id
          name
          email
        }
      }
    `;

    return this.apollo
      .mutate<{ createUser: UserDTO }>({
        mutation: CREATE_USER,
        variables: { name: user.name, email: user.email },
      })
      .pipe(
        map(res => {
          this.userCreated$.next();
          return res.data!.createUser
        })
      );
  }

  getAllUsers(): Observable<UserDTO[]> {
    const GET_ALL_USERS = gql`
      query {
        getAllUsers {
          id
          name
          email
        }
      }
    `;

    return this.apollo
      .watchQuery<{ getAllUsers: UserDTO[] }>({
        query: GET_ALL_USERS
      })
      .valueChanges
      .pipe(map(result => result.data.getAllUsers));
  }
}