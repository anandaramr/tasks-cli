import { Database } from "../database/database.js"

export interface TaskSchema {
    id?: number,
    name: string,
    completed: boolean,
}

export const Task = new Database<TaskSchema>('tasks')