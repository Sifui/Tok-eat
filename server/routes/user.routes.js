const router = require("express").Router()
const bcrypt = require('bcrypt')
const Client = require("../model/client.model")
const Restaurant = require("../model/restaurant.model")

router.post('/login', async (req, res) => {
    
    const client = await Client.findByEmail(req.body.email)

    const restaurant = await Restaurant.findByEmail(req.body.email)

    if(client && (await bcrypt.compare(req.body.password, client.password)))
    {
        req.session.userId = client.userId
        client.password = null
        res.json(client)

    }
    else if(restaurant && (await bcrypt.compare(req.body.password, restaurant.password)))
    {
        req.session.userId = restaurant.userId
        restaurant.password = null
        res.json(restaurant)
    }
    else
    {
        res.status(401)
        res.json(false)
    }
})

module.exports = router