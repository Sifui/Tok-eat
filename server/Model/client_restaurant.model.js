const PostgresStore = require("../PostgresStore")
const Client = require('./client.model')
const Restaurant = require('./restaurant.model')

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
        const result = await PostgresStore.client.query({
            text: `INSERT INTO ${Client_Restaurant.tableName}
                    (favorite,grade,grade_date,feedback,id_client,id_restaurant)
                    VALUES($1,$2,current_timestamp,$3,$4,$5)
                    RETURNING *
            `,
            values: [fb.favorite, fb.grade, fb.feedback, fb.clientId, fb.restaurantId]
        })
        return result.rows[0]
    }
    static async get(restaurant_id) {
        const result = await PostgresStore.client.query({
            text: `SELECT id_client,first_name,last_name,feedback,grade,grade_date,favorite  from ${Client_Restaurant.tableName} as cl,${Restaurant.tableName} as r,client as c  
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
            text: `SELECT DISTINCT r.id,r.name,r.phone_number,r.address  from ${Client_Restaurant.tableName} as cl,${Restaurant.tableName} as r,client as c  
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
             set grade = $1,
            feedback = $2
            WHERE id_client = $3
            and id_restaurant = $4
            RETURNING *
                `
            
            values = [ f.grade, f.feedback, f.clientId, f.restaurantId]
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
            FROM ${Client_Restaurant.tableName} as cl,${Restaurant.tableName} as r
            WHERE r.id = cl.id_restaurant
            AND r.id = $1`,
            values: [restaurantId]
        })
        return result.rows[0]
    }
    static async getTopRated() {
        let result = await PostgresStore.client.query({
            text: `SELECT * from ${Restaurant.tableName} 
            
           limit 9`,
                /* 
                text: `SELECT * FROM ${Client_Restaurant.tableName} as cl, ${Restaurant.tableName} as r
            where cl.id_restaurant = r.id
           order by grade desc 
           limit 9`,*/
        })
       /* if ( result.rows.length ===0)
        {
            result = await PostgresStore.client.query({
                text: `SELECT * FROM ${Restaurant.tableName}
               limit 9`,
    
            })
        }*/
        return result.rows
    }
}

/** @type {String} */
Client_Restaurant.tableName = 'client_restaurant'

module.exports = Client_Restaurant