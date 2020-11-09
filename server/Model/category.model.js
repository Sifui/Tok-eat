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

}

/** @type {String} */
Category.tableName = 'category'

module.exports = Category