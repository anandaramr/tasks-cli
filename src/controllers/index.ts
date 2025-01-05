import { Task, TaskSchema } from "../schemas/tasks.js";

export async function newTask(name: string) {
    await Task.insertOne({ name, completed: false })
}

export async function getAllTasks() {
    const data = await getTasks()
    if (data.length==0) {
        console.log('\x1b[36mNo tasks found\x1b[0m')
        return;
    }
    displayTasks(data)
}

export async function getIncompleteTasks() {
    const data = await getTasks({ completed: false })
    if (data.length==0) {
        console.log('\x1b[36mNo incomplete tasks found :)\x1b[0m')
        return;
    }
    displayTasks(data)
}

export function deleteTaskById(id: number) {
    Task.delete({ id })
}

export function deleteAllTasks() {
    Task.delete()
}

export function completeTask(id: number) {
    Task.update({ id }, { completed: true })
}

export function undoTask(id: number) {
    Task.update({ id }, { completed: false })
}

async function getTasks(query?: any) {
    const data = await Task.select(query)
    return data
}

function displayTasks(data: TaskSchema[]) {
    return data.map((element: TaskSchema) => {
        const { id, ...rest } = element
        console.log({ id, ...rest })
    });
}