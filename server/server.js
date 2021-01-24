let PostgresStore = require('./PostgresStore')

PostgresStore.init()
.then(() => console.log('connected'))

let express = require("express")
let cookieParser = require('cookie-parser')
let bodyParser = require("body-parser")
let logger = require('morgan')
const session = require('express-session')
let cors = require("cors")
let app = express()
let port = 8081

let userRouter = require('./route/user.route')
let restaurantsRouter = require('./route/restaurants.route')
let offerRouter = require('./route/offer.route')
let clientRestaurantRouter = require('./route/client-restaurant.route')
let basketRouter = require('./route/basket.route')
let categoryRouter = require('./route/category.route')
let tokenRouter = require('./route/token.route')

app.use(express.static(__dirname + '/assets'));


let orderedProduct = require('./route/ordered_product.route')
const sessionExpress = session({
    secret: 'ZSW58:]kn/=c9Xp&',
    resave: false,
    saveUninitialized: false
})
app.use(sessionExpress)

app.use(bodyParser.json({
    limit: '50mb',
    extended: true
}));
app.use(cors({
    credentials: true,
    origin: 'http://localhost:8080' // si votre port est différent, changez cette valeur !
}))
app.use(express.urlencoded({ extended: true }))
app.use(logger('dev'))
app.use(cookieParser())

let server = app.listen(port, () => {
    console.log('Server is listening on port '+port)
});
let io = require("socket.io")(server,{
    cors: {
        origin: "*",
        /*credentials: true,
        methods: ['GET', 'POST']*/
    },
})

let restaurants = {}
io.on('connection',(socket)=>{
    /*socket.use((packet,next)=>{
        console.log('Bonjour salut')
        sessionExpress(socket.request, {}, next)
    })*/
    console.log('user connected', (new Date()).toISOString())

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    socket.on('reservation',(id)=>{
        //console.log('session:',socket.request.session.userId)
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
    socket.on('cancelled',(basket)=>{
        io.to(basket.restaurantId).emit('cancelled',basket.clientId)

    })
    socket.on('restaurantCancelledReservation',(response)=>{
        io.to(response.restaurantId).emit('currentReservationCancelled',{clientId:response.clientId,message:response.message})
    }) 
    
})

app.use('/', userRouter);
app.use('/', restaurantsRouter);
app.use('/', offerRouter);
app.use('/',clientRestaurantRouter)
app.use('/',basketRouter)
app.use('/',categoryRouter)
app.use('/',orderedProduct)
app.use('/',tokenRouter)