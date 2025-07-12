import { IsNotEmpty } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class UserById {
	@Field()
	@IsNotEmpty()
	id!: string;
}
