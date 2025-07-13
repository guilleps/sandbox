import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { initialize } from 'fireorm';
import { buildSchema } from 'type-graphql';
import { TaskResolver } from './tasks/resolvers/task.resolver';
import { UserResolver } from './users/resolvers/user.resolver';

// iniciamos firebase sdk y firestore
admin.initializeApp();
const firestore = admin.firestore();
initialize(firestore);

// invoca express
const app = express();

export const graphql = functions.https.onRequest(app);

async function startServer() {
	const schema = await buildSchema({
		resolvers: [UserResolver, TaskResolver],
	});

	const server = new ApolloServer({ schema, playground: true }); // configura los schemas y resolvers a usar en apollo

	await server.start();
	server.applyMiddleware({
		app,
		path: '/',
		cors: {
			origin: [
				'https://sandbox-ffdff.firebaseapp.com',
				'http://127.0.0.1:5001/sandbox-ffdff/us-central1/graphql',
			],
			methods: ['GET', 'POST', 'OPTIONS'],
			allowedHeaders: ['Content-Type', 'Authorization'],
		},
	}); // exponemos endpoint a la raiz del server
}

startServer().catch(error => {
	console.error('Error starting Apollo Server:', error);
});
