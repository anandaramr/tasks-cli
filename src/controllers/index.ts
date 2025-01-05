import { Task, TaskSchema } from "../schemas/tasks.js";

export async function newTask(name: string) {
    await Task.insertOne({ name, completed: false })
    console.log(`\x1b[32mCreated new task:\x1b[0m ${name}`)
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

export async function deleteTaskById(id: number) {
    await Task.delete({ id })
    console.log(`Deleted task ${id}`)
}

export async function deleteAllTasks() {
    await Task.delete()
    console.log('Deleted all tasks')
}

export async function completeTask(id: number) {
    await Task.update({ id }, { completed: true })
    console.log(`Marked task:${id} as complete`)
}

export async function undoTask(id: number) {
    await Task.update({ id }, { completed: false })
    console.log(`Marked task:${id} as incomplete`)
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