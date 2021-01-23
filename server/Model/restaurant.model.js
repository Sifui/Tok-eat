const PostgresStore = require("../PostgresStore")
const bcrypt = require('bcrypt')
const Schedule = require('./schedule.model')
const Basket = require("./basket.model")
const Ordered_Product = require("./ordered_product.model")
const Offer = require("./offer.model")
const Category = require("./category.model")

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
                image TEXT,
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
            limit 5
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

    static async delete(restaurantId){
        const result = await PostgresStore.client.query({
            text: `DELETE FROM ${Restaurant.tableName}
            WHERE id=$1`,
            values: [Number(restaurantId)]
        })
        return result.rows[0]
    }

    static async editName(restaurant){
        const result = await PostgresStore.client.query({
            text: `UPDATE ${Restaurant.tableName}
            SET name=$1
            WHERE id=$2`,
            values: [restaurant.name, Number(restaurant.id)]
        })
        return result.rows[0]
    }

    static async editEmail(restaurant){
        const result = await PostgresStore.client.query({
            text: `UPDATE ${Restaurant.tableName}
            SET email=$1
            WHERE id=$2`,
            values: [restaurant.email, Number(restaurant.id)]
        })
        return result.rows[0]
    }

    static async editDescription(restaurant){
        const result = await PostgresStore.client.query({
            text: `UPDATE ${Restaurant.tableName}
            SET desscription=$1
            WHERE id=$2`,
            values: [restaurant.description, Number(restaurant.id)]
        })
        return result.rows[0]
    }

    static async editPhone(restaurant){
        const result = await PostgresStore.client.query({
            text: `UPDATE ${Restaurant.tableName}
            SET phone_number=$1
            WHERE id=$2`,
            values: [restaurant.phoneNumber, Number(restaurant.id)]
        })
        return result.rows[0]
    }

    static async editAddress(restaurant){
        const result = await PostgresStore.client.query({
            text: `UPDATE ${Restaurant.tableName}
            SET address=$1
            WHERE id=$2`,
            values: [restaurant.address, Number(restaurant.id)]
        })
        return result.rows[0]
    }

    static async updateRestaurantDataExceptPassword(restaurant){
        const result = await PostgresStore.client.query({
            text: `UPDATE ${Restaurant.tableName}
            SET name=$1, description=$2 , address=$3, phone_number=$4 , email=$5
            WHERE id=$6 RETURNING *`,
            values: [restaurant.name, restaurant.description, restaurant.address,restaurant.phone_number,restaurant.email, Number(restaurant.id)]
        })
        return result.rows[0]
    }

    static async editPassword(restaurant){
        const hashedPw = await bcrypt.hash(restaurant.password,10)
        const result = await PostgresStore.client.query({
            text: `UPDATE ${Restaurant.tableName}
            SET password=$1
            WHERE id=$2`,
            values: [hashedPw, Number(restaurant.id)]
        })
        return result.rows[0]
    }

    static async editImage(imageName,restaurant){
        const result = await PostgresStore.client.query({
            text: `UPDATE ${Restaurant.tableName}
            SET image=$1
            WHERE id=$2 RETURNING *`,
            values: [imageName, Number(restaurant.id)]
        })
        return result.rows[0]
    }
    static async getSales(restaurantId)
    {
        console.log('idResto',restaurantId)
        const result = await PostgresStore.client.query({
            text: `
            SELECT o.name, 
                    o.price, 
                    req.total_quantity 
            FROM (SELECT o.id, 
                        Sum(op.quantity) AS total_quantity 
                 FROM  ${Basket.tableName} AS b LEFT JOIN ${Ordered_Product.tableName} AS op ON b.id = op.id_basket 
               			  LEFT JOIN ${Offer.tableName} AS o ON op.id_offer = o.id 
               			  LEFT JOIN ${Category.tableName} AS c ON o.id_category = c.id 
               			  LEFT JOIN ${Restaurant.tableName} AS r ON c.id_restaurant = r.id 
                WHERE  r.id = $1 
                AND b.validation = true 
                GROUP  BY o.id) AS req 
                INNER JOIN offer AS o ON o.id = req.id 
            `,
            values: [restaurantId]
        })
        return result.rows
    }
    static async getSalesPerMonth(restaurantId)
    {
        console.log('idResto',restaurantId)
        const result = await PostgresStore.client.query({
            text: `select o.id,o.name,order_date ,sum(quantity)
            from basket as b left join ordered_product as op on b.id = op.id_basket 
                             left join offer as o on op.id_offer = o.id
                             LEFT JOIN category AS c ON o.id_category = c.id 
                            LEFT JOIN restaurant AS r ON c.id_restaurant = r.id 
                        WHERE  r.id = $1
                        and validation = true
            group by o.id,o.name,order_date`,
            values: [restaurantId]
        })
        return result.rows
    }

}

/** @type {String} */
Restaurant.tableName = 'restaurant'

module.exports = Restaurant