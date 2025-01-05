#!/usr/bin/env node

import { completeTask, deleteAllTasks, deleteTaskById, getAllTasks, getIncompleteTasks, newTask, undoTask } from "./controllers/index.js"
import { program } from "commander"

program
    .version("v1.0.0")
    .name("tasks")
    .description("Simple command-line to-do app")
    .option("-a, --all", "List all tasks")
    .option("-t, --todo", "List all incomplete tasks")
    .option("-n, --new <NAME>", "Create new task")
    .option("-d, --done <ID>", "Mark task as completed")
    .option("-u, --undo <ID>", "Mark task as incomplete")
    .option("-D, --delete <ID>", "Delete a task")
    .option("-C, --clear", "Delete all tasks")
.parse(process.argv)

const options = program.opts()

if(options.all) {
    getAllTasks()
}
else if (options.todo) {
    getIncompleteTasks()
}
else if (options.new) {
    newTask(options.new)
}
else if (options.done) {
    const id = parseInt(options.done)
    completeTask(id)
}
else if (options.undo) {
    const id = parseInt(options.undo)
    undoTask(id)
}
else if (options.delete) {
    const id = parseInt(options.delete)
    deleteTaskById(id)  
}
else if (options.clear) {
    deleteAllTasks()  
}