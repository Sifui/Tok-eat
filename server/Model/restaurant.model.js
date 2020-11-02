const PostgresStore = require("../PostgresStore")
const bcrypt = require('bcrypt')
const Schedule = require('./schedule.model')

class Restaurant {
    static toSQLTable () {
        return `
            CREATE TABLE ${Restaurant.tableName} (
                id SERIAL PRIMARY KEY,
                name TEXT,
                email TEXT,
                phone_number TEXT,
                address TEXT,
                description TEXT,
                image BYTEA,
                password TEXT,
                schedule INTEGER REFERENCES ${Schedule.tableName}(id)
            )
        `
    }

    static async create (restaurant) {

        const hashedPw = await bcrypt.hash(restaurant.password,10)

        const result = await PostgresStore.client.query({
            text: `INSERT INTO ${Restaurant.tableName}
                    (name, email, phone_number, address, description, image, password, schedule)
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
                    values : [
                        restaurant.name, restaurant.email, restaurant.phoneNumber,
                        restaurant.address, restaurant.description, restaurant.image, hashedPw, restaurant.schedule
                    ]
        })
        return result.rows[0]
    }

    static async findByEmail(email) {

        const result = await PostgresStore.client.query({
            text: `SELECT * FROM ${Restaurant.tableName}
            WHERE email=$1`,
            values : [email]
        })
        return result.rows[0]
    }
    static async findByName(name) {

        const result = await PostgresStore.client.query({
            text: `SELECT * FROM ${Restaurant.tableName}
            WHERE name ilike $1`,
            values : [name+'%']
        })
        return result.rows
    }
    static async findTrendsByName(name) {

        const result = await PostgresStore.client.query({
            text: `SELECT * FROM ${Restaurant.tableName}
            WHERE name ilike $1 
            limit 7
            `,
            values : [name+'%']
        })
        return result.rows
    }

    static async getAll(){
        const result = await PostgresStore.client.query({
            text:`SELECT * from ${Restaurant.tableName}`
        })
        return result.rows
    }

    static async getById (restaurantId) {
        const result = await PostgresStore.client.query({
            text: `SELECT * FROM ${Restaurant.tableName}
            WHERE id=$1`,
            values: [restaurantId]
        })
        return result.rows[0]
    }

    
}

/** @type {String} */
Restaurant.tableName = 'restaurant'

module.exports = Restaurant