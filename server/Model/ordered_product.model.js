const PostgresStore = require("../PostgresStore")
const Basket = require('./basket.model')
const Category = require("./category.model")
const Offer = require('./offer.model')
const Restaurant = require("./restaurant.model")

class Ordered_Product {
    static toSQLTable () {
        return `
            CREATE TABLE ${Ordered_Product.tableName} (
                id SERIAL PRIMARY KEY,
                quantity INT,
                id_basket INTEGER REFERENCES ${Basket.tableName}(id),
                id_offer INTEGER REFERENCES ${Offer.tableName}(id) ON DELETE CASCADE
            )
        `
    }
     static async create(product){
        const result = await PostgresStore.client.query({
            text: `INSERT INTO ${Ordered_Product.tableName}
                    (quantity, id_basket, id_offer)
                    VALUES ($1, $2, $3) RETURNING *`,
                    values : [product.quantity,product.basketId,product.idOffer]
        })
        return result.rows[0]
    }
    static async getByMe(idRestaurant){
        console.log(idRestaurant)
        const result = await PostgresStore.client.query({
            text: `SELECT op.id_basket,
                                o.name,
                                o.price,
                                o.priority,
                                op.quantity,
                                b.id_client
                        FROM ${Basket.tableName} AS b
                        LEFT JOIN ${Ordered_Product.tableName} AS op ON b.id = op.id_basket
                        INNER JOIN
                        (SELECT DISTINCT ON (id_client) id
                            FROM ${Basket.tableName}
                            ORDER BY id_client DESC, id DESC) AS req ON op.id_basket = req.id
                        LEFT JOIN ${Offer.tableName} AS o ON op.id_offer = o.id
                        LEFT JOIN ${Category.tableName} AS c ON o.id_category = c.id
                        LEFT JOIN restaurant AS r ON c.id_restaurant = r.id
                        WHERE r.id = $1
                        AND validation = FALSE
                        AND cancel = FALSE
                        ORDER BY id_client desc`,
                    values : [idRestaurant]
        })
        return result.rows
    }
}

/** @type {String} */
Ordered_Product.tableName = 'ordered_product'

module.exports = Ordered_Product