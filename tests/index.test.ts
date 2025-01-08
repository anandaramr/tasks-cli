import { describe, it, expect, beforeEach, afterAll, beforeAll } from "vitest";
import { TaskController } from "../src/controllers/index";
import { testDb } from "./mock/db";

const controller = new TaskController(testDb)

describe('Create and read', () => {
    afterAll(clearDB)
    
    it('Should return empty array when tasks are retrieved', async () => {
        const all = await controller.getAllTasks()
        const incomplete = await controller.getIncompleteTasks()
        
        expect(all).toStrictEqual([])
        expect(incomplete).toStrictEqual([])
    })
    
    it('Should create new tasks', async () => {
        await controller.newTask('some task')
        await controller.newTask('some other task')

        const all = await controller.getAllTasks()
        const incomplete = await controller.getIncompleteTasks()
        
        expect(all.length).toBe(2)
        expect(incomplete.length).toBe(2)
    })
})

describe('Mark as complete or incomplete', async () => {
    afterAll(clearDB)
    
    beforeAll(async () => {
        await controller.newTask('some task')
    })
    
    it('Should mark task as complete', async () => {
        await controller.completeTask(1)
        expect((await controller.getIncompleteTasks()).length).toBe(0)
    })
    
    it('Should mark task as incomplete', async () => {
        await controller.undoTask(1)
        expect((await controller.getIncompleteTasks()).length).toBe(1)
    })
})

describe('Should be able to create and delete tasks', async () => {
    afterAll(clearDB)
    beforeAll(async () => {
        for (let i=0; i<5; i++) {
            await controller.newTask(i.toString())
        }
    })

    it('Should delete a task', async () => {
        await controller.deleteTaskById(1)
        const data = await controller.getAllTasks()
        expect(data.length==4 && data[0].id!=1).toBeTruthy()
    })

    it('Should delete all tasks', async () => {
        await controller.deleteAllTasks()
        const data = await controller.getAllTasks()
        expect(data.length==0).toBeTruthy()
    })
})

async function clearDB() {
    await testDb.clear()
}