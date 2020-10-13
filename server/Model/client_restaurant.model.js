const PostgresStore = require("../PostgresStore")
const Client = require('./client.model')
const Restaurant = require('./restaurant.model')

class Client_Restaurant {
    static toSQLTable () {
        return `
            CREATE TABLE ${Client_Restaurant.tableName} (
                id SERIAL PRIMARY KEY,
                favorite BOOLEAN,
                grade INTEGER,
                token INTEGER,
                id_client INTEGER REFERENCES ${Client.tableName}(id),
                id_restaurant INTEGER REFERENCES ${Restaurant.tableName}(id)
            )
        `
    }
}

/** @type {String} */
Client_Restaurant.tableName = 'client_restaurant'

module.exports = Client_Restaurant