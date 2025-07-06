import { Field, InputType } from "type-graphql";

@InputType()
export class DeleteTask {
  @Field()
  taskId!: string;
}
