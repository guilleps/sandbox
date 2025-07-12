import { Collection } from 'fireorm';
import { Field, ID, ObjectType } from 'type-graphql';

@Collection('users')
@ObjectType()
export class User {
	@Field(() => ID)
	id!: string;

	@Field()
	name!: string;

	@Field()
	email!: string;
}
