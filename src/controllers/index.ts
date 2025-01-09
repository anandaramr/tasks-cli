import { Database } from "../database/database.js";
import { Task, TaskSchema } from "../schemas/tasks.js";

export class TaskController {
    private readonly db

    public constructor (db: Database<TaskSchema>) {
        this.db = db
    }
    
    async newTask(name: string) {
        await this.db.insertOne({ name, completed: false })
    }
    
    async getAllTasks() {
        const data = await this.getTasks()
        return data
    }
    
    async getIncompleteTasks() {
        const data = await this.getTasks({ completed: false })
        return data.map((item: TaskSchema) => {
            const { completed, ...rest } = item
            return rest
        })
    }
    
    async deleteTaskById(id: number) {
        await this.db.delete({ id })
    }
    
    async deleteAllTasks() {
        await this.db.delete()
    }
    
    async completeTask(id: number) {
        await this.db.update({ id }, { completed: true })
    }
    
    async undoTask(id: number) {
        await this.db.update({ id }, { completed: false })
    }
    
    async getTasks(query?: any) {
        const data = await this.db.select(query)
        return data
    }
}

export const controller = new TaskController(Task)