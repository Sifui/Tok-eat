let PostgresStore = require('./PostgresStore')

PostgresStore.init()
.then(() => console.log('connected'))

let express = require("express")
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


app.use(express.static(__dirname + '/assets'));


let orderedProduct = require('./route/ordered_product.route')

let app = express()

app.use(session({
    secret: 'ZSW58:]kn/=c9Xp&',
    resave: false,
    saveUninitialized: false
}))


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

app.listen(port, () => {
    console.log('Server is listening on port '+port)
});
let io = require("socket.io")(server,{
    cors: {
        origin: "*",
      },
     
})

io.on('connection',(socket)=>{
    console.log('user connected')
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
     
})

app.use('/', userRouter);
app.use('/', restaurantsRouter);
app.use('/', offerRouter);
app.use('/',clientRestaurantRouter)
app.use('/',basketRouter)
app.use('/',categoryRouter)
app.use('/',orderedProduct)