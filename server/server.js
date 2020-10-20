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

var userRouter = require('./routes/user.routes')

var app = express()
app.use(session({
    secret: 'ZSW58:]kn/=c9Xp&',
    resave: false,
    saveUninitialized: false
}))


app.use(bodyParser.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(logger('dev'))

app.listen(port, () => {
    console.log('Server is listening')
});

app.use('/', userRouter);