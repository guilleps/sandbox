export class TaskListDTO {
    id!: string;
    title!: string;
    description?: string;
    done?: boolean;
    assignedToUserId!: string;
}