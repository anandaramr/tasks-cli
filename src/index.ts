#!/usr/bin/env node

import { OptionValues, program } from "commander"
import { controller } from "./controllers/index.js"

program
    .version("v1.0.0")
    .name("tasks")
    .description("Simple command-line to-do app")

program
    .command('list')
    .description('Display tasks (default: display only incomplete tasks)')
    .option("-a, --all", "Display all tasks")
    .option("-H, --head [limit]", "Display only first [limit] number of tasks")
    .option("-c, --count", "Display the number of tasks retrieved")
    .option("-s, --search <key>", "Search for task")
    .action(async options => {
        const data = await (options.all ? controller.getAllTasks() : controller.getIncompleteTasks())
        displayTasks(data, options)
    })

program
    .command('new')
    .description('Create new task')
    .argument('<name>')
    .action(async (name) => {
        await controller.newTask(name)
        console.log(`\x1b[32mCreated new task:\x1b[0m ${name}`)
    })

program
    .command('update')
    .description('Update task status')
    .argument('<ID>')
    .option("-d, --done", "Mark task as completed")
    .option("-u, --undo", "Mark task as incomplete")
    .action(async (arg, options) => {
        if(options.done && options.undo) {
            console.log(`\x1b[91mERROR:\x1b[0m Both --done and --undo flag cannot be used at the same time`)
            return;
        }

        const id = parseInt(arg)
        if (options.done) {
            await controller.completeTask(id)
            console.log(`Marked task ${id} as complete`)
        } else if (options.undo) {
            await controller.undoTask(id)
            console.log(`Marked task ${id} as incomplete`)
        } else {
            console.log('\x1b[91mERROR:\x1b[0m either --done or --undo flag required')
        }
    })

program
    .command('delete')
    .description('Delete tasks')
    .option('-i, --id <ID>', 'Delete task by ID')
    .option("-a, --all", "Delete all tasks")
    .action(async options => {
        if(options.done && options.undo) {
            console.log(`\x1b[91mERROR:\x1b[0m Both --id and --all flag cannot be used at the same time`)
            return;
        }

        if (options.all) {
            await controller.deleteAllTasks()
            console.log('Deleted all tasks')
        } else if (options.id) {
            const id = parseInt(options.id)
            await controller.deleteTaskById(id)  
            console.log(`Deleted task ${id}`)
        } else {
            console.log('\x1b[91mERROR:\x1b[0m either --id or --all flag required')
        }
    })

program.parse(process.argv)

if(process.argv.length<3) {
    program.help()
}

type SchemaType = { id: number, name: string } & Object

function displayTasks(data: SchemaType[], options: OptionValues) {
    let displayed = false

    if (options.count) {
        const suffix = options.all ? 'found' : 'to be completed'
        console.log(`${data.length} tasks ${suffix}`)
        return
    }
    
    const defaultHeadValue = 5
    const limit = !options.head ? 0 : (typeof options.head=='string' ? toInt(options.head) : defaultHeadValue)
    if(limit==null) {
        console.log(`\x1b[91mInvalid argument:\x1b[0m \"${options.head}\"`)
        process.exit(1)
    }

    data.forEach((element: SchemaType, idx: number) => {
        
        const condition1 = !options.head || idx<limit
        const condition2 = !options.search || element.name.toLowerCase().includes(options.search.toLowerCase())
        
        if(condition1 && condition2) {
            displayed = true
            const { id, ...rest } = element
            console.log({ id, ...rest })
        } 
    });

    if (!displayed) {
        console.log('\x1b[36mNo tasks found\x1b[0m')
        return;
    }
    
    function toInt(value: string) {
        const intVal = parseInt(value)
    
        if(Number.isNaN(intVal)) {
            return null
        }
    
        return intVal > 0 ? intVal : defaultHeadValue
    }
}