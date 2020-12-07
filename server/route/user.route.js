const router = require("express").Router()
const bcrypt = require('bcrypt')
const fs = require('fs')
const Client = require("../model/client.model")
const Restaurant = require("../model/restaurant.model")
const hasToBeAuthenticated = require('../middlewares/has-to-be-authenticated.middleware')
const { client } = require("../PostgresStore")
const Offer = require('../model/offer.model')
const http = require('http');

router.post('/login', async (req, res) => {
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

router.post('/check_password', hasToBeAuthenticated, async (req, res) => {
    // console.log('HERE ===> ' + req.body);
    const client = await Client.findByEmail(req.body.email)
    if (client && (await bcrypt.compare(req.body.password, client.password))) {
        res.json({ password: true })
    }
    else {
        res.json({ password: false })
    }
})

router.get('/me', hasToBeAuthenticated, async (req, res) => {

    let user = {}

    if (req.session.type === "client") {
        user = await Client.getById(req.session.userId)
        user.type = "client"
    }
    else if(req.session.type === "restaurant")
    {
        user = await Restaurant.getById(req.session.userId)
        user.type = "restaurant"
    }

    user.password = null // NE JAMAIS ENVOYER SON MDP À L'UTILISATEUR
    res.json(user)
})

router.post('/logout', hasToBeAuthenticated, (req, res) => {
    req.session.destroy(() => { })
    res.json({ message: 'Déconnecté' })
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
            res.json({ message: "formulaire manquant" })
        }
        else if (!emailRegex.test(req.body.email)) {
            res.status(400)
            res.json({ message: "erreur - email invalide" })
        }
        else if (await Client.findByEmail(req.body.email)) {
            res.status(401)
            res.json({ message: "erreur - email déjà utilisé" })
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
            res.json({ message: "formulaire manquant" })
        }
        else if (!emailRegex.test(req.body.email)) {
            res.status(400)
            res.json({ message: "erreur - email invalide" })
        }
        else if (await Restaurant.findByEmail(req.body.email)) {
            res.status(401)
            res.json({ message: "erreur - email déjà utilisé" })
        }
        else {
            let restaurant = await Restaurant.create(req.body)
            restaurant.password = null
            res.json({ user: restaurant })
        }
    }
    else {
        res.status(401)
        res.json({ message: "Ce genre d' utilisateur n' existe pas" })
    }
})

router.post('/unregister', hasToBeAuthenticated, async (req, res) => {
    if (req.session.type == "client") {
        const result = await Client.delete(req.session.userId)
        res.json(result)
        res.json({ message: 'Pas enregistré' })
    }

    if (req.session.type == "restaurant") {
        const res1 = await Offer.deleteByRest(req.session.userId)
        const res2 = await Restaurant.delete(req.session.userId)
        res.json(res1)
        res.json(res2)
        res.json({ message: 'Pas enregistré' })
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

/////////////// Setra code début ////////////////////////////////////////

router.put('/edit_password', hasToBeAuthenticated, async (req, res) => {
    await Client.editPassword(req.body)
    res.json({ password: true })
})

router.put('/update_client_data', hasToBeAuthenticated, async (req, res) => {
    let mail = await Client.findByEmail(req.body.email)
    if (mail) {
        if (mail.id === req.body.id) {
            const result = Client.updateClientDataExceptPassword(req.body)
            res.json(result)
        } else {
            res.json({ message: " Erreur - email déjà utilisé " })
        }
    }
    else {
        const result = Client.updateClientDataExceptPassword(req.body)
        res.json(result)
    }
})

router.post('/upload_profil_image', hasToBeAuthenticated, async (req, res) => {
    // console.log(req.body.client);
    let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    let randomChars = ''
    for (var i = 0; i < 15; i++) {
        randomChars += chars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    // let path = `./assets/profil-images/${req.body.client.toBeDeletedImage}.png`
    // console.log(path);
    // fs.unlink(path, (err) => {
    //     if (err) {
    //         console.error(err)
    //     }
    //     //file removed
    // })

    let randomNumber = (Math.floor(Math.random() * 999999999999999) + 11).toString();
    let imageName = randomChars.concat(randomNumber)
    console.log(imageName);
    let result = await Client.editImage(imageName, req.body.client)

    let base64Data = req.body.url.replace(/^data:image\/(png|jpeg);base64,/, "");
    fs.writeFile(`./assets/profil-images/${imageName}.png`, base64Data, 'base64', function (err) {
        console.log(err);
    });
    res.status(200).json(result)
})


////////////////////// Setra code fin ///////////////////////////////////////////

module.exports = router