const PostgresStore = require('./PostgresStore')

PostgresStore.init()
.then(() => console.log('connected'))

var express = require("express")
var bodyParser = require("body-parser")
var logger = require('morgan')
const session = require('express-session')
var cors = require("cors")
var app = express()
var port = 8081

var userRouter = require('./route/user.route')
var restaurantsRouter = require('./route/restaurants.route')
var offerRouter = require('./route/offer.route')
var clientRestaurantRouter = require('./route/client-restaurant.route')
var basketRouter = require('./route/basket.route')
var categoryRouter = require('./route/category.route')

var app = express()
app.use(session({
    secret: 'ZSW58:]kn/=c9Xp&',
    resave: false,
    saveUninitialized: false
}))


app.use(bodyParser.json())
app.use(cors({
    credentials: true,
    origin: 'http://localhost:8080' // si votre port est différent, changez cette valeur !
}))
app.use(express.urlencoded({ extended: true }))
app.use(logger('dev'))

app.listen(port, () => {
    console.log('Server is listening')
});

app.use('/', userRouter);
app.use('/', restaurantsRouter);
app.use('/', offerRouter);
app.use('/',clientRestaurantRouter)
app.use('/',basketRouter)
app.use('/',categoryRouter)