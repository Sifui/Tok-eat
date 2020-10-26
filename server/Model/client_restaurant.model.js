const PostgresStore = require("../PostgresStore")
const Client = require('./client.model')
const Restaurant = require('./restaurant.model')

class Client_Restaurant {
    static toSQLTable () {
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
    static async create(feedback){
        console.log(feedback.Client_id)
        console.log(feedback.Restaurant_id)
        const result = await PostgresStore.client.query({
            text:`INSERT INTO ${Client_Restaurant.tableName}
                    (id_client,id_restaurant,grade,grade_date,feedback)
                    VALUES($1,$2,$3,current_timestamp,$4)
            `,
            values:[feedback.id_client,feedback.id_restaurant,feedback.grade,feedback.feedback]
        })
    }
    static async get(restaurant_id)
    {
        const result = await PostgresStore.client.query({
            text:`select first_name,last_name,feedback,grade,grade_date  from ${Client_Restaurant.tableName} as cl,restaurant as r,client as c  
                where r.id = cl.id_restaurant
                and cl.id_client = c.id
                and r.id = $1
                `,
            values: [restaurant_id]
        })
        return result.rows
    }
}

/** @type {String} */
Client_Restaurant.tableName = 'client_restaurant'

module.exports = Client_Restaurant