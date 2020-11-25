const PostgresStore = require("../PostgresStore")
const Client = require('./client.model')
const Client_Restaurant = require("./client_restaurant.model")

class Basket {
    static toSQLTable () {
        return `
            CREATE TABLE ${Basket.tableName} (
                id SERIAL PRIMARY KEY,
                validation BOOLEAN,
                on_site BOOLEAN,
                order_date TIMESTAMP,
                meal_date TIMESTAMP,
                total INTEGER,
                id_client INTEGER REFERENCES ${Client.tableName}(id),
                id_client_restaurant INTEGER REFERENCES ${Client_Restaurant.tableName}(id)
            )
        `
    }
}

/** @type {String} */
Basket.tableName = 'basket'

module.exports = Basket