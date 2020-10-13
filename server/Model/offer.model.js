const PostgresStore = require("../PostgresStore")
const Restaurant = require('./restaurant.model')
const Promo = require('./promo.model')

class Offer {
    static toSQLTable () {
        return `
            CREATE TABLE ${Offer.tableName} (
                id SERIAL PRIMARY KEY,
                name TEXT,
                price FLOAT,
                description TEXT,
                image BYTEA,
                id_restaurant INTEGER REFERENCES ${Restaurant.tableName}(id),
                id_promo INTEGER REFERENCES ${Promo.tableName}(id)
            )
        `
    }
}

/** @type {String} */
Offer.tableName = 'offer'

module.exports = Offer