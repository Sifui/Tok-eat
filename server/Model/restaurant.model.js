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

        await PostgresStore.client.query({
            text: `INSERT INTO ${Restaurant.tableName}
                    (name, email, phone_number, address, description, image, password, schedule)
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
                    values : [
                        restaurant.name, restaurant.email, restaurant.phone_number,
                        restaurant.address, restaurant.description, restaurant.image, hashedPw, restaurant.schedule
                    ]
        })
    }
}

/** @type {String} */
Restaurant.tableName = 'restaurant'

module.exports = Restaurant