import { IsEmail, IsNotEmpty } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class CreateUser {
  @Field()
  @IsNotEmpty()
  name!: string;

  @Field()
  @IsEmail()
  email!: string;
}