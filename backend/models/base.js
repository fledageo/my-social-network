import db from './init.js';

export class Base {
    constructor() {
        this.table = this.constructor.name.toLowerCase();
    }

     insert(obj) {
        const keys = Object.keys(obj).join(', ');
        const values = Object.values(obj).map(value => `'${value}'`).join(', ');

        const sql = `INSERT INTO ${this.table} (${keys}) VALUES (${values})`;
        return  db.prepare(sql).run();
    }

     findAll() {
        const sql = `SELECT * FROM ${this.table}`;
        const rows =  db.prepare(sql).all();
        return rows;
    }

     findWhere(obj) {
        const conditions = Object.entries(obj)
            .map(([key, value]) => `${key} = '${value}'`)
            .join(' AND ');

        const sql = `SELECT * FROM ${this.table} WHERE ${conditions}`;
        const rows =  db.prepare(sql).all();
        return rows;
    }
    findOne(obj){
        return this.findWhere(obj)?.[0]
    }

     update(where, setter) {
        const whereConditions = Object.entries(where)
            .map(([key, value]) => `${key} = '${value}'`)
            .join(' AND ');

        const setStatements = Object.entries(setter)
            .map(([key, value]) => `${key} = '${value}'`)
            .join(', ');

        const sql = `UPDATE ${this.table} SET ${setStatements} WHERE ${whereConditions}`;
       return  db.prepare(sql).run();
    }

     delete(where) {
        const conditions = Object.entries(where)
            .map(([key, value]) => `${key} = '${value}'`)
            .join(' AND ');

        const sql = `DELETE FROM ${this.table} WHERE ${conditions}`;
        return  db.prepare(sql).run();
    }
}
