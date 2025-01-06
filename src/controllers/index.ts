import { Database } from "../database/database.js";
import { Task, TaskSchema } from "../schemas/tasks.js";

type SchemaType = { id: number } & Object

export class TaskController {
    private readonly db

    public constructor (db: Database<TaskSchema>) {
        this.db = db
    }
    
    async newTask(name: string) {
        await this.db.insertOne({ name, completed: false })
        console.log(`\x1b[32mCreated new task:\x1b[0m ${name}`)
    }
    
    async getAllTasks() {
        const data = await this.getTasks()
        if (data.length==0) {
            console.log('\x1b[36mNo tasks found\x1b[0m')
            return;
        }
        this.displayTasks(data)
    }
    
    async getIncompleteTasks() {
        const data = await this.getTasks({ completed: false })
        if (data.length==0) {
            console.log('\x1b[36mNo incomplete tasks found :)\x1b[0m')
            return;
        }
        this.displayTasks(data)
    }
    
    async deleteTaskById(id: number) {
        await this.db.delete({ id })
        console.log(`Deleted task ${id}`)
    }
    
    async deleteAllTasks() {
        await this.db.delete()
        console.log('Deleted all tasks')
    }
    
    async completeTask(id: number) {
        await this.db.update({ id }, { completed: true })
        console.log(`Marked task ${id} as complete`)
    }
    
    async undoTask(id: number) {
        await this.db.update({ id }, { completed: false })
        console.log(`Marked task ${id} as incomplete`)
    }
    
    async getTasks(query?: any) {
        const data = await this.db.select(query)
        return data
    }
        
    private displayTasks(data: SchemaType[]) {
        return data.map((element: SchemaType) => {
            const { id, ...rest } = element
            console.log({ id, ...rest })
        });
    }
}

export const controller = new TaskController(Task)