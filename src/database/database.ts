import fs from 'node:fs/promises'
import { FsError } from '../types/FsError'

type DataSchema<T> = { id?: number } & T

export class Database<T> {
    private database: string

    constructor (name: string) {
        this.database = `${import.meta.dirname}/${name}.json`
    }

    public async select(query?: any) {
        if (query) {
            return await this.selectData(query)
        }
        return await this.readData()
    }

    public async insertOne(value: T) {
        let data = await this.readData()

        const insertValue = value as DataSchema<T>
        if (!insertValue.id) insertValue.id = data.length + 1
        data.push(insertValue)
        this.writeData(data)
    }

    public async insert(value: T[]) {
        let data = await this.readData()
        data = data.concat(value)
        this.writeData(data)
    }

    public async delete(query?: any) {
        if(!query) {
            this.writeData([])
            return;
        }
        
        const data = await this.filter(query)
        await this.writeData(data)
    }

    public async update(query: any, updatedValue: any) {
        const data = await this.updateData(query, updatedValue)
        await this.writeData(data)
    }

    public async clear() {
        try {
            await fs.unlink(this.database)
        } catch(err) {
            const error = err as FsError
            if (error.code!='ENOENT') {
                console.log('error')
            }
        }
    }

    private async readData() {
        let data

        try {
            data = await fs.readFile(this.database, { encoding: 'utf-8' })
            if(!data) return []
            return JSON.parse(data)
        } catch (err) {
            const error = err as FsError
            if (error.code=='ENOENT') {
                await this.writeData([])
                return []
            }

            console.error("error: ", error)
            process.exit(1)
        }
    }

    private async writeData(content: DataSchema<T>[]) {
        try {
            const data = JSON.stringify(content, null, 4)
            await fs.writeFile(this.database, data)
        } catch (err) {
            console.error(err)
        }
    }

    private async filter(query: any) {
        const data = await this.readData()

        return data.filter((item: any) => {
            for(let key of Object.keys(query)) {
                if(item[key]!=query[key]) return true;
            }
            return false
        })
    }

    private async selectData(query: any) {
        const data = await this.readData()

        return data.filter((item: any) => {
            for(let key of Object.keys(query)) {
                if(item[key]==query[key]) return true;
            }
            return false
        })
    }

    private async updateData(query: any, updatedValue: any) {
        const data = await this.readData()

        return data.map((item: any) => {
            for(let key of Object.keys(query)) {
                if(item[key]==query[key]) {
                    return { ...item, ...updatedValue };
                }
            }

            return item
        })
    }
}