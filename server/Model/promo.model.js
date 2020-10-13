const PostgresStore = require("../PostgresStore")

class Promo {
    static toSQLTable () {
        return `
            CREATE TYPE OFFRE_ENUM AS ENUM ('case_one', 'case_two', 'case_three');
            CREATE TABLE ${Promo.tableName} (
                id SERIAL PRIMARY KEY,
                promo FLOAT,
                offre  OFFRE_ENUM,
                description TEXT,
                limit_date TIMESTAMP
            )
        `
    }
}

/** @type {String} */
Promo.tableName = 'promo'

module.exports = Promo