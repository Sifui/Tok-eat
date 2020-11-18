const router = require("express").Router()
const Offer = require("../model/offer.model")
const PostgresStore = require("../PostgresStore")
const hasToBeAuthenticated = require('../middlewares/has-to-be-authenticated.middleware')

router.get('/offer/:id', async (req,res)=>{
    const result = await Offer.getByIdRestaurant(req.params.id)
    res.json(result)
})

router.post('/offer', hasToBeAuthenticated, async (req,res)=>{
    const result = await Offer.create(req.body)
    res.json(result)
})

router.delete('/offer', hasToBeAuthenticated, async (req,res)=>{
    const result = await Offer.delete(req.body.id)
    res.json(result)
})

router.put('/offer', hasToBeAuthenticated, async (req,res)=>{
    const result = await Offer.modif(req.body)

    if(!req.body.name ||
        !req.body.price ||
        !Req.body.description)
    {
        res.status(400)
        res.json({message: "missimg form"})
    }
    else {
        res.json(result)
    }
})

module.exports = router

