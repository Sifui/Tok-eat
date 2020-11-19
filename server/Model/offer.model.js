const PostgresStore = require("../PostgresStore")
const Promo = require('./promo.model')
const Category = require("./category.model")

class Offer {
    static toSQLTable () {
        return `
            CREATE TABLE ${Offer.tableName} (
                id SERIAL PRIMARY KEY,
                name TEXT,
                price FLOAT,
                description TEXT,
                priority INTEGER,
                image BYTEA,
                id_category INTEGER REFERENCES ${Category.tableName}(id) ON DELETE CASCADE,
                id_promo INTEGER REFERENCES ${Promo.tableName}(id) ON DELETE CASCADE

            )
        `
    }

    static async create (offer) {
        const result = await PostgresStore.client.query({
            text: `INSERT INTO ${Offer.tableName}
                    (name, price, description, priority, image, id_category, id_promo)
                    VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
                    values : [
                        offer.name, Number(offer.price), offer.description, offer.priority, offer.image, offer.idCategory, offer.idPromo
                    ]
        })
        return result.rows[0]
    }

    static async delete(id){
        const result = await PostgresStore.client.query({
            text: `DELETE FROM ${Offer.tableName}
            WHERE id=$1`,
            values: [Number(id)]
        })
        return result.rows[0]
    }

    static async modif(offer){
        const result = await PostgresStore.client.query({
            text:`UPDATE ${Offer.tableName}
            SET name=$1, price=$2, description=$3, id_category=$4
            WHERE id=$5
            RETURNING *`,
            values : [offer.name, offer.price, offer.description,offer.idCategory,offer.id]
        })
        return result.rows[0]
    }

        static async getByIdRestaurant (restaurantId) {
        const result = await PostgresStore.client.query({
            text: `SELECT ${Offer.tableName}.id, ${Offer.tableName}.name, ${Offer.tableName}.price, ${Offer.tableName}.description, ${Offer.tableName}.image, ${Offer.tableName}.priority,
            ${Category.tableName}.id as idCategory,${Category.tableName}.name as categoryName,${Category.tableName}.priority as categoryPriority
            FROM ${Offer.tableName} 
            JOIN ${Category.tableName}
            ON(${Category.tableName}.id=${Offer.tableName}.id_category) 
            WHERE id_restaurant=$1
            ORDER BY ${Category.tableName}.priority`,
            values: [restaurantId]
        })
        return result.rows
    }
}

/** @type {String} */
Offer.tableName = 'offer'

module.exports = Offer