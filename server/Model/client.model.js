const PostgresStore = require("../PostgresStore")
const bcrypt = require('bcrypt')

class Client {
    static toSQLTable () {
        return `
            CREATE TABLE ${Client.tableName} (
                id SERIAL PRIMARY KEY,
                first_name TEXT,
                last_name TEXT,
                email TEXT,
                phone_number TEXT,
                address TEXT,
                image BYTEA,
                is_admin BOOLEAN,
                password TEXT
            )
        `
    }

    static async create (client) {

        const hashedPw = await bcrypt.hash(client.password,10)

        await PostgresStore.client.query({
            text: `INSERT INTO ${Client.tableName}
                    (first_name, last_name, email, phone_number, address, image, is_admin, password)
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
                    values : [
                        client.first_name, client.last_name, client.email, client.phone_number,
                        client.address, client.image, client.isAdmin,hashedPw
                    ]
        })
    }

    static async findByEmail(email) {

        const result = await PostgresStore.client.query({
            text: `SELECT * FROM ${Client.tableName}
            WHERE email=$1`,
            values : [email]
        })
        return result.rows[0]
    }

}

/** @type {String} */
Client.tableName = 'client'

module.exports = Client