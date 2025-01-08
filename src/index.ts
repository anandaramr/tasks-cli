#!/usr/bin/env node

import { program } from "commander"
import { controller } from "./controllers/index.js"

program
    .version("v1.0.0")
    .name("tasks")
    .description("Simple command-line to-do app")
    .option("-a, --all", "List all tasks")
    .option("-t, --todo", "List all incomplete tasks")
    .option("-H, --head [limit]", "Display a subset of tasks retrieved")
    .option("-c, --count", "Display the number of tasks retrieved")
    .option("-n, --new <NAME>", "Create new task")
    .option("-d, --done <ID>", "Mark task as completed")
    .option("-u, --undo <ID>", "Mark task as incomplete")
    .option("-D, --delete <ID>", "Delete a task")
    .option("-C, --clear", "Delete all tasks")
.parse(process.argv)

const options = program.opts()

if(options.all) {
    const data = await controller.getAllTasks()
    displayTasks(data)
}
else if (options.todo) {
    const data = await controller.getIncompleteTasks()
    displayTasks(data)
}
else if (options.new) {
    await controller.newTask(options.new)
    console.log(`\x1b[32mCreated new task:\x1b[0m ${options.new}`)
}
else if (options.done) {
    const id = parseInt(options.done)
    await controller.completeTask(id)
    console.log(`Marked task ${id} as complete`)
}
else if (options.undo) {
    const id = parseInt(options.undo)
    await controller.undoTask(id)
    console.log(`Marked task ${id} as incomplete`)
}
else if (options.delete) {
    const id = parseInt(options.delete)
    await controller.deleteTaskById(id)  
    console.log(`Deleted task ${id}`)
}
else if (options.clear) {
    await controller.deleteAllTasks()
    console.log('Deleted all tasks')
}

type SchemaType = { id: number } & Object

function displayTasks(data: SchemaType[]) {
    if (data.length==0) {
        console.log('\x1b[36mNo tasks found\x1b[0m')
        return;
    }

    if (options.count) {
        const suffix = options.all ? 'found' : 'to be completed'
        console.log(`${data.length} tasks ${suffix}`)
        return
    }

    const limit = !options.head ? 0 : (typeof options.head=='string' ? parseInt(options.head) : 5)
    return data.map((element: SchemaType, idx: number) => {
        if(!options.head || idx<limit) {
            const { id, ...rest } = element
            console.log({ id, ...rest })
        } 
    });
}