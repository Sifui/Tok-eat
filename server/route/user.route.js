const router = require("express").Router()
const bcrypt = require('bcrypt')
const Client = require("../model/client.model")
const Restaurant = require("../model/restaurant.model")
const hasToBeAuthenticated = require('../middlewares/has-to-be-authenticated.middleware')

router.post('/login', async (req, res) => {
    console.log('HERE ===> '+req.body);
    const client = await Client.findByEmail(req.body.email)

    const restaurant = await Restaurant.findByEmail(req.body.email)

    if(client && (await bcrypt.compare(req.body.password, client.password)))
    {
        req.session.userId = client.id
        req.session.type = "client"
        client.password = null
        res.json({user: client})

    }
    else if(restaurant && (await bcrypt.compare(req.body.password, restaurant.password)))
    {
        req.session.userId = restaurant.userId
        req.session.type = "restaurant"
        restaurant.password = null
        res.json({user: restaurant})
    }
    else
    {
        res.json({user: false})
    }
})

router.get('/me', hasToBeAuthenticated, async (req, res) => {
    
    let user = {}

    if(req.session.type === "client")
    {
        user = await Client.getById(req.session.userId)
    }
    else if(req.session.type === "restaurant")
    {
        user = await Client.getById(req.session.userId)
    }

    user.password = null // NE JAMAIS ENVOYER SON MDP À L'UTILISATEUR
    res.json(user)
})

router.post('/logout', hasToBeAuthenticated, (req, res) => {
    req.session.destroy(() => {})
    res.json({ message: 'disconnected' })
})

router.post('/register', async (req, res) => {
    let emailRegex= /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    if(req.body.type === "client")
    {   
        if(!req.body.firstName ||
            !req.body.lastName ||
            !req.body.email ||
            !req.body.phoneNumber ||
            !req.body.address ||
            !req.body.password
        )
        {
            res.status(400)
            res.json({message: "missing form"})
        }
        else if(!emailRegex.test(req.body.email))
        {
            res.status(400)
            res.json({message: "error invalid mail"})
        }
        else if(await Client.findByEmail(req.body.email))
        {
            res.status(401)
            res.json({message: "error already used mail"})
        }
        else
        {
            let client = await Client.create(req.body)
            client.password = null
            res.json({user: client})
        }
    }
    else if(req.body.type === "restaurant")
    {
        if(!req.body.name ||
            !req.body.email ||
            !req.body.phoneNumber ||
            !req.body.address ||
            !req.body.description ||
            !req.body.password
        )
        {
            res.status(400)
            res.json({message: "missing form"})
        }
        else if(!emailRegex.test(req.body.email))
        {
            res.status(400)
            res.json({message: "error invalid mail"})
        }
        else if(await Restaurant.findByEmail(req.body.email))
        {
            res.status(401)
            res.json({message: "error already used mail"})
        }
        else
        {
            let restaurant = await Restaurant.create(req.body)
            restaurant.password = null
            res.json({user: restaurant})
        }
    }
    else
    {
        res.status(401)
        res.json({message: "This kind of user doesn't exist"})
    }
})

module.exports = router