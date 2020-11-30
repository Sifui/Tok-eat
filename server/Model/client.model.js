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
                image TEXT,
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

//////////////////  SETRA code début ///////////////////////////////////////////////////
    static async updateClientDataExceptPassword(client){
        const result = await PostgresStore.client.query({
            text: `UPDATE ${Client.tableName}
            SET first_name=$1, last_name=$2 , address=$3, phone_number=$4 , email=$5, image=$6
            WHERE id=$7 RETURNING *`,
            values: [client.first_name, client.last_name, client.address,client.phone_number,client.email, client.image, Number(client.id)]
        })
        return result.rows[0]
    }
    static async editName(client){
        const result = await PostgresStore.client.query({
            text: `UPDATE ${Client.tableName}
            SET first_name=$1, last_name=$2
            WHERE id=$3 RETURNING *`,
            values: [client.first_name, client.last_name, Number(client.id)]
        })
        return result.rows[0]
    }
//////////////////  Setra code fin //////////////////////////////////////////////////////

    static async editEmail(client){
        const result = await PostgresStore.client.query({
            text: `UPDATE ${Client.tableName}
            SET email=$1
            WHERE id=$2`,
            values: [client.email, Number(client.id)]
        })
        return result.rows[0]
    }

    static async editPassword(client){
        const hashedPw = await bcrypt.hash(client.password,10)
        const result = await PostgresStore.client.query({
            text: `UPDATE ${Client.tableName}
            SET password=$1
            WHERE id=$2`,
            values: [hashedPw, Number(client.id)]
        })
        return result.rows[0]
    }

    static async editPhone(client){
        const result = await PostgresStore.client.query({
            text: `UPDATE ${Client.tableName}
            SET phone_number=$1
            WHERE id=$2`,
            values: [client.phoneNumber, Number(client.id)]
        })
        return result.rows[0]
    }

    static async editAddress(client){
        const result = await PostgresStore.client.query({
            text: `UPDATE ${Client.tableName}
            SET address=$1
            WHERE id=$2`,
            values: [client.address, Number(client.id)]
        })
        return result.rows[0]
    }
}
/** @type {String} */
Client.tableName = 'client'

module.exports = Client