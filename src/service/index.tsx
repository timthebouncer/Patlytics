import { openDB } from 'idb';
import {Infringing} from "../type";

export async function initDB() {
    const db = await openDB("Records", 1, {
        upgrade(db) {
            // Create a store of objects
            const store = db.createObjectStore('records', {
                keyPath: 'analysis_id',
                autoIncrement: true,
            });
        },
    });



    const idbRcd = {
        async get(key) {
            console.log(key)
            return (await db).get('records', key)
        },
        async getAll():Promise<Infringing.InfringingResponse[]> {
            return (await (await db).getAll('records')) || [].reverse()
        },
        async set(val) {
            console.log(val,'val')
            return await db.add('records', val);
        },
        async delete(key) {
            return (await db).delete("records", key);
        },
        async clear() {
            return (await db).clear("records");
        },
        async keys() {
            return (await db).getAllKeys("records");
        }
    };

    return { db, idbRcd };
}