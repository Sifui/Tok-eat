const PostgresStore = require("../PostgresStore")
const Client = require('./client.model')

class Basket {
    static toSQLTable () {
        return `
            CREATE TABLE ${Basket.tableName} (
                id SERIAL PRIMARY KEY,
                validation BOOLEAN,
                cancel BOOLEAN,
                on_site BOOLEAN,
                order_date TIMESTAMP,
                meal_date TIMESTAMP,
                id_client INTEGER REFERENCES ${Client.tableName}(id)
            )
        `
    }
     static async create(clientId)
    {
        const result = await PostgresStore.client.query({
            text: `INSERT INTO ${Basket.tableName}
                    (validation,cancel, on_site, order_date,meal_date,id_client)
                    VALUES (false,false, true, CURRENT_DATE,CURRENT_DATE,$1)
                     RETURNING *`,
                    values : [
                        clientId
                    ]
        })
        return result.rows[0]
    }
    static async getById(id)
    {
        const result = await PostgresStore.client.query({
            text: `SELECT * 
                    FROM ${Basket.tableName} 
                    WHERE id_client = $1
                    order by id desc
					limit 1`,
                    values : [id]
        })
        return result.rows[0]
    }
    static async validate(id)
    {
        const result = await PostgresStore.client.query({
            text: `UPDATE ${Basket.tableName} SET validation = true WHERE id = $1 RETURNING *`,
                    values : [id]
        })
        return result.rows
    }
    static async cancel(id)
    {
        const result = await PostgresStore.client.query({
            text: `UPDATE ${Basket.tableName} SET cancel = true WHERE id = $1 RETURNING *`,
                    values : [id]
        })
        return result.rows
    }
}

/** @type {String} */
Basket.tableName = 'basket'

module.exports = Basket