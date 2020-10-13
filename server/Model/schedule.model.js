const PostgresStore = require("../PostgresStore")

class Schedule {
    static toSQLTable () {
        return `
            CREATE TABLE ${Schedule.tableName} (
                id SERIAL PRIMARY KEY,
                monday_open TIMESTAMP,
                monday_close TIMESTAMP,
                tuesday_open TIMESTAMP,
                tuesday_close TIMESTAMP,
                wednesday_open TIMESTAMP,
                wednesday_close TIMESTAMP,
                thursday_open TIMESTAMP,
                thursday_close TIMESTAMP,
                friday_open TIMESTAMP,
                friday_close TIMESTAMP,
                saturday_open TIMESTAMP,
                saturday_close TIMESTAMP,
                sunday_open TIMESTAMP,
                sunday_close TIMESTAMP
            )
        `
    }
}

/** @type {String} */
Schedule.tableName = 'schedule'

module.exports = Schedule