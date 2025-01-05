#!/usr/bin/env node

import { completeTask, deleteAllTasks, deleteTaskById, getAllTasks, getIncompleteTasks, newTask, undoTask } from "./controllers/index.js"
import { parseArgs } from "./helpers/parseArgs.js"

const [ ,, ...args ] = process.argv
const { values, options } = parseArgs(args)

if (options.length==1) {
    if (options[0]=='all') {
        getAllTasks()
    }
    
    else if (options[0]=='todo') {
        getIncompleteTasks()
    }

    else if (options[0]=='new') {
        expect('name')
        await newTask(values[0])
        console.log(`\x1b[32mCreated new task:\x1b[0m ${values[0]}`)
    }

    else if (options[0]=='delete') {
        if (values.length!=0) {
            const id = parseInt(values[0])
            deleteTaskById(id)
        } else {
            deleteAllTasks()
        }        
    }

    else if (options[0]=='do') {
        expect('id')

        const id = parseInt(values[0])
        completeTask(id)
    }

    else if (options[0]=='undo') {
        expect('id')
        const id = parseInt(values[0])
        undoTask(id)
    }
} else {
    console.log('\x1b[36mUsage: \x1b[0m tasks <options> <values>\n')
    console.log('\x1b[90m  --all\x1b[0m\t\t List all tasks')
    console.log('\x1b[90m  --todo\x1b[0m\t List all incomplete tasks')
    console.log()
    
    console.log('\x1b[90m  --new\x1b[0m NAME\t Create new task with given title')
    console.log('\x1b[90m  --do\x1b[0m ID\t Set status of task as completed')
    console.log('\x1b[90m  --undo\x1b[0m ID\t Set status of task as not completed')
    console.log()

    console.log('\x1b[90m  --delete\x1b[0m ID\t Delete task with given id')
    console.log('\x1b[90m  --delete\x1b[0m\t Delete all tasks')

    process.exit(0)
}

function expect(value: string) {
    if(values.length==0) {
        console.error(`\x1b[31mERROR:\x1b[0m Expected value \"${value}\"`)
        process.exit(1)
    }
}