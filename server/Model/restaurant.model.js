const PostgresStore = require("../PostgresStore")
const Schedule = require('./schedule.model')

class Restaurant {
    static toSQLTable () {
        return `
            CREATE TABLE ${Restaurant.tableName} (
                id SERIAL PRIMARY KEY,
                name TEXT,
                email TEXT,
                phone_number TEXT,
                adress TEXT,
                description TEXT,
                image BYTEA,
                password TEXT,
                schedule INTEGER REFERENCES ${Schedule.tableName}(id)
            )
        `
    }
}

/** @type {String} */
Restaurant.tableName = 'restaurant'

module.exports = Restaurant