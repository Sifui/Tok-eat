const PostgresStore = require("../PostgresStore")
const bcrypt = require('bcrypt')
const { postgres } = require("../server.config")

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

        const result = await PostgresStore.client.query({
            text: `INSERT INTO ${Client.tableName}
                    (first_name, last_name, email, phone_number, address, image, is_admin, password)
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
                    values : [
                        client.firstName, client.lastName, client.email, client.phoneNumber,
                        client.address, client.image, false,hashedPw
                    ]
        })
        return result.rows[0]
    }

    static async findByEmail(email) {

        const result = await PostgresStore.client.query({
            text: `SELECT * FROM ${Client.tableName}
            WHERE email=$1`,
            values : [email]
        })
        return result.rows[0]
    }

    static async getById (clientId) {
        const result = await PostgresStore.client.query({
            text: `SELECT * FROM ${Client.tableName}
            WHERE id=$1`,
            values: [Number(clientId)]
        })
        return result.rows[0]
    }

    static async delete(clientId){
        const result = await PostgresStore.client.query({
            text: `DELETE FROM ${Client.tableName}
            WHERE id=$1`,
            values: [Number(clientId)]
        })
        return result.rows[0]
    }
}

/** @type {String} */
Client.tableName = 'client'

module.exports = Client