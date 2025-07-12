import { IsNotEmpty } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class DeleteUser {
	@Field()
	@IsNotEmpty()
	id!: string;
}
