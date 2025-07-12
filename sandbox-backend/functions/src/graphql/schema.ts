import { gql } from 'apollo-server-express';

// definimos el objeto User -- necesario para la descripcion de datos
// CRUD -> R == query || C U D = mutation
// query (operacion de lecture o consulta) -- ejecuta una consulta basada en convenciones propias, un punto de entrada
// mutation (modificación del estado de un objeto) -- agregar
export const typeDefs = gql`
    type User {
        id: ID!
        name: String!
        email: String!
    }
        
    type Task {
        id: ID!
        title: String!
        description: String?
        done: boolean!
        assignedToUserId: String!
    }

    type Query {
        users: [User!]!
        userByEmail(email: String!): User
        taskByUser(userId: String!): [Task!]!
    }

    type Mutation {
        createUser(name: String!, email: String!): User!
        delete(id: String!): String!
        createTask(title: String!, description: String, assignedToUserId: String!): Task!
        markTaskAsDone(taskId: String!): Task!
        deleteTask(taskId: String!): String!
    }
`;
