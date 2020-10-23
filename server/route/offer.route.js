const router = require("express").Router()
const Offer = require("../model/offer.model")
const PostgresStore = require("../PostgresStore")

router.get('/offer/:id', async (req,res)=>{

    const result = await Offer.getByIdRestaurant(req.params.id)
    res.json(result)
})

module.exports = router