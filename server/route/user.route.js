const router = require("express").Router()
const bcrypt = require('bcrypt')
const Client = require("../model/client.model")
const Restaurant = require("../model/restaurant.model")
const hasToBeAuthenticated = require('../middlewares/has-to-be-authenticated.middleware')
const Offer = require('../model/offer.model')

router.post('/login', async (req, res) => {
    console.log('HERE ===> ' + req.body);
    const client = await Client.findByEmail(req.body.email)

    const restaurant = await Restaurant.findByEmail(req.body.email)

    if (client && (await bcrypt.compare(req.body.password, client.password))) {
        req.session.userId = client.id
        req.session.type = "client"
        client.password = null
        client.type = "client"
        res.json({ user: client })
    }
    else if (restaurant && (await bcrypt.compare(req.body.password, restaurant.password))) {
        req.session.userId = restaurant.id
        req.session.type = "restaurant"
        restaurant.password = null
        restaurant.type = "restaurant"
        res.json({ user: restaurant })

    }
    else {
        res.json({ user: false })
    }
})

router.get('/me', hasToBeAuthenticated, async (req, res) => {

    let user = {}

    if (req.session.type === "client") {
        user = await Client.getById(req.session.userId)
        user.type = "client"
    }
    else if (req.session.type === "restaurant") {
        user = await Client.getById(req.session.userId)
        user.type = "restaurant"
    }

    user.password = null // NE JAMAIS ENVOYER SON MDP À L'UTILISATEUR
    res.json(user)
})

router.post('/logout', hasToBeAuthenticated, (req, res) => {
    req.session.destroy(() => { })
    res.json({ message: 'disconnected' })
})

router.post('/register', async (req, res) => {
    let emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    if (req.body.type === "client") {
        if (!req.body.firstName ||
            !req.body.lastName ||
            !req.body.email ||
            !req.body.phoneNumber ||
            !req.body.address ||
            !req.body.password
        ) {
            res.status(400)
            res.json({ message: "missing form" })
        }
        else if (!emailRegex.test(req.body.email)) {
            res.status(400)
            res.json({ message: "error invalid mail" })
        }
        else if (await Client.findByEmail(req.body.email)) {
            res.status(401)
            res.json({ message: "error already used mail" })
        }
        else {
            let client = await Client.create(req.body)
            client.password = null
            res.json({ user: client })
        }
    }
    else if (req.body.type === "restaurant") {
        if (!req.body.name ||
            !req.body.email ||
            !req.body.phoneNumber ||
            !req.body.address ||
            !req.body.description ||
            !req.body.password
        ) {
            res.status(400)
            res.json({ message: "missing form" })
        }
        else if (!emailRegex.test(req.body.email)) {
            res.status(400)
            res.json({ message: "error invalid mail" })
        }
        else if (await Restaurant.findByEmail(req.body.email)) {
            res.status(401)
            res.json({ message: "error already used mail" })
        }
        else {
            let restaurant = await Restaurant.create(req.body)
            restaurant.password = null
            res.json({ user: restaurant })
        }
    }
    else {
        res.status(401)
        res.json({ message: "This kind of user doesn't exist" })
    }
})

router.post('/unregister', hasToBeAuthenticated, async (req, res) => {
    if (req.session.type == "client") {
        const result = await Client.delete(req.session.userId)
        res.json(result)
        res.json({ message: 'unregistered' })
    }

    if (req.session.type == "restaurant") {
        const res1 = await Offer.deleteByRest(req.session.userId)
        const res2 = await Restaurant.delete(req.session.userId)
        res.json(res1)
        res.json(res2)
        res.json({ message: 'unregistered' })
    }
})

router.put('/edit_name', hasToBeAuthenticated, async (req, res) => {
    if (req.session.type === "client") {
        const result = await Client.editName(req.body)
        res.json(result)
    }

    if (req.session.type == "restaurant") {
        const result = await Restaurant.editName(req.body)
        res.json(result)
    }
})

router.put('/edit_email', hasToBeAuthenticated, async (req, res) => {
    if (req.session.type == "client") {
        const result = await Client.editEmail(req.body)
        res.json(result)
    }

    if (req.session.type == "restaurant") {
        const result = await Restaurant.editEmail(req.body)
        res.json(result)
    }
})

router.put('/edit_description', hasToBeAuthenticated, async (req, res) => {
    if (req.session.type == "restaurant") {
        const result = await Restaurant.editDescription(req.body)
        res.json(result)
    }
})

router.put('/edit_phone', hasToBeAuthenticated, async (req, res) => {
    if (req.session.type == "client") {
        const result = await Client.editPhone(req.body)
        res.json(result)
    }

    if (req.session.type == "restaurant") {
        const result = await Restaurant.editPhone(req.body)
        res.json(result)
    }
})

router.put('/edit_address', hasToBeAuthenticated, async (req, res) => {
    if (req.session.type == "client") {
        const result = await Client.editAddress(req.body)
        res.json(result)
    }

    if (req.session.type == "restaurant") {
        const result = await Restaurant.editAddress(req.body)
        res.json(result)
    }

    
})

router.put('edit', hasToBeAuthenticated, async (req, res) => {
    if (req.session.type == "client") {
        if (!req.body.firstName ||
            !req.body.lastName ||
            !req.body.email ||
            !req.body.phoneNumber ||
            !req.body.address
        ) {
            res.status(400)
            res.json({ message: "missing form" })
        }
        else if (!emailRegex.test(req.body.email)) {
            res.status(400)
            res.json({ message: "error invalid mail" })
        }
        else if (await Client.findByEmail(req.body.email)) {
            res.status(401)
            res.json({ message: "error already used mail" })
        }
        else{
            const result = await Client.editName(req.body)
            res.json(result)

            const result2 = await Client.editEmail(req.body)
            res.json(result2)

            const result3 = await Client.editAddress(req.body)
            res.json(result3)

            const result4 = await Client.editPhone(req.body)
            res.json(result4)
        }
    }

    if (req.session.type == "restaurant"){
        if (!req.body.name ||
            !req.body.email ||
            !req.body.phoneNumber ||
            !req.body.address ||
            !req.body.description
        ) {
            res.status(400)
            res.json({ message: "missing form" })
        }
        else if (!emailRegex.test(req.body.email)) {
            res.status(400)
            res.json({ message: "error invalid mail" })
        }
        else if (await Restaurant.findByEmail(req.body.email)) {
            res.status(401)
            res.json({ message: "error already used mail" })
        }
        else {
            const result = await Restaurant.editName(req.body)
            res.json(result)

            const result2 = await Restaurant.editAddress(req.body)
            res.json(result2)

            const result3 = await Restaurant.editDescription(req.body)
            res.json(result3)

            const result4 = await Restaurant.editPhone(req.body)
            res.json(result4)
        }
    }
})

module.exports = router