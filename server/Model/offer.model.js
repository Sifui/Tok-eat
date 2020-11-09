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
                id_restaurant INTEGER REFERENCES ${Restaurant.tableName}(id)
                ON DELETE CASCADE ON UPDATE CASCADE,
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
                        offer.name, Number(offer.price), offer.description, offer.image, offer.idRestaurant, offer.idPromo
                    ]
        })
        return result.rows[0]
    }

    static async getByIdRestaurant (restaurantId) {
        const result = await PostgresStore.client.query({
            text: `SELECT * FROM ${Offer.tableName}
            WHERE id_restaurant=$1`,
            values: [restaurantId]
        })
        return result.rows
    }

    static async delete(offerD){
        const result = await PostgresStore.client.query({
            text: `DELETE FROM ${Offer.tableName}
            WHERE id=$1`,
            values: [Number(offerD)]
        })
        return result.rows[0]
    }

    static async deleteByRest(offerR){
        const result = await PostgresStore.client.query({
            text: `DELETE FROM ${Offer.tableName}
            WHERE id_restaurant=$1`,
            values: [Number(offerR)]
        })
        return result.rows[0]
    }

    static async modifName(offerM){
        const result = await PostgresStore.client.query({
            text: `UPDATE ${Offer.tableName}
            SET name=$1
            WHERE id=$2`,
            values : [offerM.name, Number(offerM.id)]
        })
        return result.rows[0]
    }

    static async modifPrice(offerP){
        const result = await PostgresStore.client.query({
            text: `UPDATE ${Offer.tableName}
            SET price=$1
            WHERE id=$2`,
            values : [offerP.price, Number(offerP.id)]
        })
        return result.rows[0]
    }

    static async modifDes(offerD){
        const result = await PostgresStore.client.query({
            text: `UPDATE ${Offer.tableName}
            SET description=$1
            WHERE id=$2`,
            values : [offerD.description, Number(offerD.id)]
        })
        return result.rows[0]
    }

    static async modif(offer){
        const result = await PostgresStore.client.query({
            text:`UPDATE ${Offer.tableName}
            SET name=$1, price=$2, description=$3
            WHERE id=$4
            RETURNING *`,
            values : [offer.name, Number(offer.price), offer.description, Number(offer.id)]
        })
        return result.rows[0]
    }
}

/** @type {String} */
Offer.tableName = 'offer'

module.exports = Offer