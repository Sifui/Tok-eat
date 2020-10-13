const Client = require('./Model/client.model')
const Schedule = require('./Model/Schedule.model')
const Restaurant = require('./Model/Restaurant.model')

const PostgresStore = require('./PostgresStore')

async function dropEverything () {
    const result = await PostgresStore.client.query(
        `select 'drop table if exists "' || tablename || '" cascade;' AS query
        from pg_tables where schemaname = 'public';`
    )

    for (const row of result.rows) {
        console.log(row.query)
        await PostgresStore.client.query(row.query)
    }
}

async function createEverything () {
    const models = [
        Client,
        Schedule,
        Restaurant
    ]

    for (const model of models) {
        const sql = model.toSQLTable()
        await PostgresStore.client.query(sql)
    }
}

async function run () {
    await PostgresStore.init()

    await dropEverything()
    await createEverything()
    //await createFakeData()
 
    console.log('terminé')
}

run()