import { Database } from "../../src/database/database.ts";
import { TaskSchema } from "../../src/schemas/tasks.js";

export const testDb = new Database<TaskSchema>('test')