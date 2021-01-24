const PostgresStore = require("../PostgresStore")
const Restaurant = require('./restaurant.model')

class Promo {
    static toSQLTable () {
        return `
            CREATE TABLE ${Promo.tableName} (
                id SERIAL PRIMARY KEY,
                name TEXT,
                percent INT,
                date DATE,
                id_restaurant INTEGER REFERENCES restaurant(id) ON DELETE CASCADE
            )
        `
    }

    static async create (promo) {
        const result = await PostgresStore.client.query({
            text: `INSERT INTO ${Promo.tableName}
                    (name, percent, date, id_restaurant)
                    VALUES ($1, $2, $3, $4) RETURNING *`,
                    values : [
                        promo.name, promo.percent, promo.date, promo.id_restaurant
                    ]
        })
        return result.rows[0]
    }

    static async getByIdRestaurant (restaurantId) {
        const result = await PostgresStore.client.query({
            text: `SELECT * FROM ${Promo.tableName} 
            WHERE id_restaurant=$1`,
            values: [restaurantId]
        })
        return result.rows
    }

    static async delete(id){
        const result = await PostgresStore.client.query({
            text: `DELETE FROM ${Promo.tableName}
            WHERE id=$1`,
            values: [Number(id)]
        })
        return result.rows[0]
    }

    static async deleteSafe(id){
        const result = await PostgresStore.client.query({
            text: `DELETE FROM ${Promo.tableName}
            WHERE id=$1 AND id_restaurant=$2`,
            values: [id.promo, id.restaurant]
        })
        return result.rows[0]
    }

    static async updateSafe(promo){
        const result = await PostgresStore.client.query({
            text:`UPDATE ${Promo.tableName}
            SET name=$1, percent=$2, date=$3
            WHERE id=$4 AND id_restaurant=$5
            RETURNING *`,
            values : [promo.name, promo.percent, promo.date, promo.id, promo.id_restaurant]
        })
        return result.rows[0]
    }

    static async update(promo){
        const result = await PostgresStore.client.query({
            text:`UPDATE ${Promo.tableName}
            SET name=$1, percent=$2, date=$3
            WHERE id=$4
            RETURNING *`,
            values : [promo.name, promo.percent, promo.date, promo.id]
        })
        return result.rows[0]
    }
}

/** @type {String} */
Promo.tableName = 'promo'

module.exports = Promo