const Client = require('./model/client.model')
const Schedule = require('./model/schedule.model')
const Restaurant = require('./model/restaurant.model')
const Client_Restaurant = require('./model/client_restaurant.model')
const Promo = require('./model/promo.model')
const Basket = require('./model/basket.model')
const Offer = require('./model/offer.model')
const Ordered_Product = require('./model/ordered_product.model')
const Category = require('./model/category.model')

const clientData = require('./utils/generateData/clientData')
const restaurantData = require('./utils/generateData/restaurantData')
const generateOffer = require('./utils/generateData/offerData').generateOffer

const PostgresStore = require('./PostgresStore')

async function dropEverything () {
    const result = await PostgresStore.client.query(
        `select 'drop table if exists "' || tablename || '" cascade;' AS query
        from pg_tables where schemaname = 'public';`
    )
    
    for (const row of result.rows) {
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
        Promo,
        Basket,
        Category,
        Offer,
        Ordered_Product
        
    ]

    for (const model of models) {
        const sql = model.toSQLTable()
        await PostgresStore.client.query(sql)
    }
}

async function createFakeData () {

    for(const client of clientData) {
        await Client.create(client)
    }
    console.log('Clients generated')

    let offerSample
    let restaurantInDb
    let category

    for(const restaurant of restaurantData) {
        restaurantInDb = await Restaurant.create(restaurant)
        offerSample = generateOffer(restaurantInDb.id,3)
        
        category = await Category.create({
            name:"autre",
            priority:0,
            idRestaurant:restaurantInDb.id
        })
        offerSample.forEach(async(offer,index) => {
            offer.idCategory = category.id
            offer.priority = index
            await Offer.create(offer)
        });
    }
    console.log('Restaurants and offers generated')
}

async function run () {
    await PostgresStore.init()

    await dropEverything()
    await createEverything()
    await createFakeData()
 
    console.log('terminé')
}

run()