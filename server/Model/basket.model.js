const PostgresStore = require("../PostgresStore")
const Client = require('./client.model')

class Basket {
    static toSQLTable () {
        return `
            CREATE TABLE ${Basket.tableName} (
                id SERIAL PRIMARY KEY,
                validation BOOLEAN,
                on_site BOOLEAN,
                order_date TIMESTAMP,
                meal_date TIMESTAMP,
                id_client INTEGER REFERENCES ${Client.tableName}(id)
            )
        `
    }
     static async create(basket)
    {
        const result = await PostgresStore.client.query({
            text: `INSERT INTO ${Basket.tableName}
                    (validation, on_site, order_date,meal_date,id_client)
                    VALUES (false, true, CURRENT_DATE,CURRENT_DATE,$1)
                     RETURNING *`,
                    values : [
                        basket.clientId
                    ]
        })
        return result.rows[0]
    }
    static async getById(id)
    {
        const result = await PostgresStore.client.query({
            text: `SELECT * FROM ${Basket.tableName} WHERE id_client = $1 AND validation = false`,
                    values : [id]
        })
        return result.rows[0]
    }
    static async validateById(id)
    {
        const result = await PostgresStore.client.query({
            text: `UPDATE ${Basket.tableName} SET validation = true WHERE id = $1 RETURNING *`,
                    values : [id]
        })
        return result.rows
    }
}

/** @type {String} */
Basket.tableName = 'basket'

module.exports = Basket