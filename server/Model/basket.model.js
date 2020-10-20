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
}

/** @type {String} */
Basket.tableName = 'basket'

module.exports = Basket