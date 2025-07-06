import { Collection } from "fireorm";
import { Field, ID, ObjectType } from "type-graphql";

@Collection('tasks')
@ObjectType()
export class Task {

    @Field(() => ID)
    id!: string;

    @Field()
    title!: string;

    @Field({ nullable: true })
    description?: string;

    @Field(() => Boolean, { nullable: true })
    done!: boolean;

    @Field()
    assignedToUserId!: string;
}