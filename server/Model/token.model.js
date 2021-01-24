const PostgresStore = require("../PostgresStore")
const Client = require('./client.model')
const Restaurant = require("./restaurant.model")

class Token {
    static toSQLTable() {
        return `
            CREATE TABLE ${Token.tableName} (
                id SERIAL PRIMARY KEY,
                tokens INTEGER,
                id_client INTEGER REFERENCES ${Client.tableName}(id),
                id_restaurant INTEGER REFERENCES ${Restaurant.tableName}(id),
                date TIMESTAMP
            )
        `
    }
    static async getByBothId(idClient,idRestaurant) {
        const result = await PostgresStore.client.query({
            text: `select * from ${Token.tableName}
            where id_client = $1  AND id_restaurant=$2`,
            values: [idClient,idRestaurant]
        })
        return result.rows[0]
    }
    static async AddToken(addedTokens,idClient,idRestaurant) {
        const result = await PostgresStore.client.query({
            text: `update ${Token.tableName}
            SET tokens=tokens+$3
            where id_client = $1  AND id_restaurant=$2`,
            values: [idClient,idRestaurant,addedTokens]
        })
        return result.rows[0]
    }
    static async create(tokens, clientId, restaurantId) {
        const result = await PostgresStore.client.query({
            text: `INSERT INTO ${Token.tableName}
                    (tokens, id_client, id_restaurant, date)
                    VALUES ($1, $2, $3, CURRENT_DATE)
                    RETURNING *`,
            values: [
                tokens, clientId, restaurantId
            ]
        })
        return result.rows[0]
    }
    static async getById(id) {
        const result = await PostgresStore.client.query({
            text: `SELECT * 
                    FROM ${Token.tableName} 
                    WHERE id_client = $1
                    
					`,
            values: [id]
        })
        return result.rows
    }
    static async getAllByClientId(id) {
        const result = await PostgresStore.client.query({
            text: `select id_client, token.id_restaurant , restaurant.name as restaurant , sum(token.tokens) as token
            from ${Token.tableName} join ${Restaurant.tableName} on ${Restaurant.tableName}.id = ${Token.tableName}.id_restaurant
            where id_client = $1 
            group by id_client, id_restaurant , restaurant.name
            order by id_restaurant`,
            values: [id]
        })
        return result.rows
    }

}

/** @type {String} */
Token.tableName = 'token'

module.exports = Token