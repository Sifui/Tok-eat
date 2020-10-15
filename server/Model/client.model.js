const PostgresStore = require("../PostgresStore")

class Client {
    static toSQLTable () {
        return `
            CREATE TABLE ${Client.tableName} (
                id SERIAL PRIMARY KEY,
                name TEXT,
                full_name TEXT,
                email TEXT,
                phone_number TEXT,
                address TEXT,
                image BYTEA,
                is_admin BOOLEAN,
                password TEXT
            )
        `
    }
}

/** @type {String} */
Client.tableName = 'client'

module.exports = Client