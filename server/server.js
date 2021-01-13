let PostgresStore = require('./PostgresStore')

PostgresStore.init()
.then(() => console.log('connected'))

let express = require("express")
let bodyParser = require("body-parser")
let logger = require('morgan')
let session = require('express-session')
let cors = require("cors")
let port = 8081

let userRouter = require('./route/user.route')
let restaurantsRouter = require('./route/restaurants.route')
let offerRouter = require('./route/offer.route')
let clientRestaurantRouter = require('./route/client-restaurant.route')
let basketRouter = require('./route/basket.route')
let categoryRouter = require('./route/category.route')
let orderedProduct = require('./route/ordered_product.route')

let app = express()

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

let server = app.listen(port, () => {
    console.log('Server is listening')
});
let io = require("socket.io")(server,{
    cors: {
        origin: "*",
      },
     
})
let restaurants = {}
io.on('connection',(socket)=>{
    console.log('user connected')
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    socket.on('reservation',(id)=>{
        io.to(id).emit('notification')
        socket.join(id)
        console.log('notification emise !')
    })
    socket.on('submitId',(id)=>{
        socket.join(id)
    }) 
    socket.on('validation',(basket)=>{
        io.to(basket.restaurantId).emit('validation',basket.clientId)
    }) 
    socket.on('cancel',(basket)=>{
        io.to(basket.restaurantId).emit('cancel',basket.clientId)

    })
})

app.use('/', userRouter);
app.use('/', restaurantsRouter);
app.use('/', offerRouter);
app.use('/',clientRestaurantRouter)
app.use('/',basketRouter)
app.use('/',categoryRouter)
app.use('/',orderedProduct)