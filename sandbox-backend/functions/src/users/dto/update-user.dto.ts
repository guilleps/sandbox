import { IsEmail, IsOptional } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class UpdateUser {
	@Field({ nullable: true })
	@IsOptional()
	name?: string;

	@Field({ nullable: true })
	@IsOptional()
	@IsEmail()
	email?: string;
}
