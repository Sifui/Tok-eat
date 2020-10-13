const Client = require('./Model/client.model')
const Schedule = require('./Model/schedule.model')
const Restaurant = require('./Model/restaurant.model')
const Client_Restaurant = require('./Model/client_restaurant.model')
const Promo = require('./Model/promo.model')

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

    dropType()
}

async function dropType() {
    await PostgresStore.client.query({
        text:`DROP TYPE IF EXISTS OFFRE_ENUM`
    })
}

async function createEverything () {
    const models = [
        Client,
        Schedule,
        Restaurant,
        Client_Restaurant,
        Promo
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