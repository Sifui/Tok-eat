const PostgresStore = require("../PostgresStore")
const Client = require('./client.model')
const Restaurant = require('./restaurant.model')
const Basket = require('./basket.model')

class Client_Restaurant {
    static toSQLTable() {
        return `
            CREATE TABLE ${Client_Restaurant.tableName} (
                id SERIAL PRIMARY KEY,
                favorite BOOLEAN,
                grade INTEGER,
                grade_date TIMESTAMP,
                feedback TEXT,
                token INTEGER,
                id_client INTEGER REFERENCES ${Client.tableName}(id),
                id_restaurant INTEGER REFERENCES ${Restaurant.tableName}(id)
            )
        `
    }
    static async create(fb) {
        console.log(fb)

        const result = await PostgresStore.client.query({
            text: `INSERT INTO ${Client_Restaurant.tableName}
                    (favorite,grade,grade_date,feedback,token,id_client,id_restaurant)
                    VALUES($1,$2,current_timestamp,$3,$4,$5)
                    RETURNING *
            `,
            values: [fb.favorite, fb.grade, fb.feedback, Number(0), fb.clientId, fb.restaurantId]
        })
        return result.rows[0]
    }
    static async get(restaurant_id) {
        const result = await PostgresStore.client.query({
            text: `SELECT first_name,last_name,feedback,grade,grade_date,favorite  from ${Client_Restaurant.tableName} as cl,restaurant as r,client as c  
            WHERE r.id = cl.id_restaurant
            AND cl.id_client = c.id
                AND r.id = $1
                `,
            values: [restaurant_id]
        })
        return result.rows
    }
    static async getFavorites(id) {
        const result = await PostgresStore.client.query({
            text: `SELECT DISTINCT r.id,r.name,r.phone_number,r.address  from ${Client_Restaurant.tableName} as cl,restaurant as r,client as c  
                WHERE r.id = cl.id_restaurant
                AND cl.id_client = c.id
                AND c.id = $1
                AND cl.favorite = true
                `,
            values: [id]
        })
        return result.rows

    }
    static async set(f) {
        let result, query
        let values = []
        if (f.feedback) {
            query = `UPDATE ${Client_Restaurant.tableName}
            set favorite = $1,
            grade = $2,
            feedback = $3
            WHERE id_client = $4
            and id_restaurant = $5
            RETURNING *
                `
            values = [f.favorite, f.grade, f.feedback, f.clientId, f.restaurantId]
        }
        else {
            console.log(f)
            query = `UPDATE ${Client_Restaurant.tableName}
            set favorite = $1
            WHERE id_client = $2
            and id_restaurant = $3
            RETURNING *
                `
            values = [f.favorite, f.clientId, f.restaurantId]
        }
        result = await PostgresStore.client.query({
            text: query,
            values: values
        })
        return result.rows[0]
    }
    static async getAverage(restaurantId) {
        const result = await PostgresStore.client.query({
            text: `SELECT avg(cl.grade) 
            FROM ${Client_Restaurant.tableName} as cl,restaurant as r
            WHERE r.id = cl.id_restaurant
            AND r.id = $1`,
            values: [restaurantId]
        })
        return result.rows[0]
    }
    static async getTopRated() {
        let result = await PostgresStore.client.query({
            text: `SELECT * FROM ${Client_Restaurant.tableName} as cl, restaurant as r
            where cl.id_restaurant = r.id
           order by grade desc 
           limit 9`,

        })
        if ( result.rows.length ===0)
        {
            result = await PostgresStore.client.query({
                text: `SELECT * FROM restaurant
               limit 9`,
    
            })
        }
        return result.rows
    }

    static async tokenInc(){
        let result = await PostgresStore.client.query({
            text: `UPDATE ${Client_Restaurant.tableName} as cr, ${Basket.tableName} as b
            SET cr.token += CAST(b.total)
            WHERE b.id_client_restaurant = cr.id 
            AND b.validation = true`
        })
        return result.rows
    }
}

/** @type {String} */
Client_Restaurant.tableName = 'client_restaurant'

module.exports = Client_Restaurant