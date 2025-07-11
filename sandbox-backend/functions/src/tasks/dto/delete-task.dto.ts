import { IsNotEmpty } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class DeleteTask {
  @Field()
  @IsNotEmpty()
  taskId!: string;
}
