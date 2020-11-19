const PostgresStore = require("../PostgresStore")
const Restaurant = require('./restaurant.model')

class Category {
    static toSQLTable () {
        return `
            CREATE TABLE ${Category.tableName} (
                id SERIAL PRIMARY KEY,
                name TEXT,
                priority INTEGER,
                id_restaurant INTEGER REFERENCES ${Restaurant.tableName}(id) ON DELETE CASCADE
            )
        `
    }

    static async create (category) {

        const result = await PostgresStore.client.query({
            text: `INSERT INTO ${Category.tableName}
                    (name, priority, id_restaurant)
                    VALUES ($1, $2, $3) RETURNING *`,
                    values : [
                        category.name,category.priority,category.idRestaurant
                    ]
        })
        return result.rows[0]
    }

    static async getByIdRestaurant (restaurantId) {
        const result = await PostgresStore.client.query({
            text: `SELECT * FROM ${Category.tableName}
            WHERE id_restaurant=$1
            ORDER BY priority`,
            values: [restaurantId]
        })
        return result.rows
    }

    static async update(category){
        const result = await PostgresStore.client.query({
            text:`UPDATE ${Category.tableName}
            SET name=$1, priority=$2
            WHERE id=$3
            RETURNING *`,
            values : [category.name, category.priority, category.id]
        })
        return result.rows[0]
    }

}

/** @type {String} */
Category.tableName = 'category'

module.exports = Category