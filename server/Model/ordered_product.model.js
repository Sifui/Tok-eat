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
                id_offer INTEGER REFERENCES ${Offer.tableName}(id)
            )
        `
    }
     static async create(product){

        const result = await PostgresStore.client.query({
            text: `INSERT INTO ${Ordered_Product.tableName}
                    (quantity, id_basket, id_offer)
                    VALUES ($1, $2, $3) RETURNING *`,
                    values : [product.quantity,product.idBasket,product.idOffer]
        })
        return result.rows[0]
    }
    static async getByRestaurantId(idRestaurant){

        const result = await PostgresStore.client.query({
            text: `SELECT op.id_basket,
                                o.name,
                                o.price,
                                o.priority,
                                op.quantity,
                                b.id_client
                        FROM Basket AS b
                        LEFT JOIN ordered_product AS op ON b.id = op.id_basket
                        INNER JOIN
                        (SELECT DISTINCT ON (id_client) id
                            FROM basket
                            ORDER BY id_client DESC, id DESC) AS req ON op.id_basket = req.id
                        LEFT JOIN Offer AS o ON op.id_offer = o.id
                        LEFT JOIN Category AS c ON o.id_category = c.id
                        LEFT JOIN Restaurant AS r ON c.id_restaurant = r.id
                        WHERE r.id = $1
                        AND validation = FALSE
                        order by id_client desc
            `,
                    values : [idRestaurant]
        })
        return result.rows
    }
}

/** @type {String} */
Ordered_Product.tableName = 'ordered_product'

module.exports = Ordered_Product