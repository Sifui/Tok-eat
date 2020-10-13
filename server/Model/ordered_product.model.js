const PostgresStore = require("../PostgresStore")
const Basket = require('./basket.model')
const Offer = require('./offer.model')

class Ordered_Product {
    static toSQLTable () {
        return `
            CREATE TABLE ${Ordered_Product.tableName} (
                id SERIAL PRIMARY KEY,
                quantity INT,
                id_basket INTEGER REFERENCES ${Basket.tableName}(id),
                id_offer INTEGER REFERENCES ${Offer.tableName}(id)
            )
        `
    }
}

/** @type {String} */
Ordered_Product.tableName = 'ordered_product'

module.exports = Ordered_Product