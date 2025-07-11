import { IsBoolean, IsNotEmpty, IsOptional, Length } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class CreateTask {
    @Field()
    @IsNotEmpty()
    @Length(3, 100)
    title!: string;

    @Field({ nullable: true })
    @IsOptional()
    @Length(0, 200)
    description?: string;

    @Field(() => Boolean, { defaultValue: false, nullable: true })
    @IsOptional()
    @IsBoolean()
    done!: boolean;

    @Field()
    @IsNotEmpty({ message: 'Debe asignarse un usuario responsable' })
    assignedToUserId!: string;
}