export class CreateTaskDTO {
    title!: string;
    description?: string;
    done!: boolean;
    assignedToUserId!: string;
}