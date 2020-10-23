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

    static async create (offer) {

        const result = await PostgresStore.client.query({
            text: `INSERT INTO ${Offer.tableName}
                    (name, price, description, image, id_restaurant, id_promo)
                    VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
                    values : [
                        offer.name, offer.price, offer.description, offer.image, offer.idRestaurant, offer.idPromo
                    ]
        })
        return result.rows[0]
    }
}

/** @type {String} */
Offer.tableName = 'offer'

module.exports = Offer