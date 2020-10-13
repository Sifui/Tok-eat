const PostgresStore = require("../PostgresStore")

class Client {
    static toSQLTable () {
        return `
            CREATE TABLE ${Client.tableName} (
                id SERIAL PRIMARY KEY,
                name TEXT,
                full_age TEXT,
                email TEXT,
                phone_number TEXT,
                adress TEXT,
                image BYTEA,
                password TEXT
            )
        `
    }
}

/** @type {String} */
Client.tableName = 'client'

module.exports = Client