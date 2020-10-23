const router = require("express").Router()
const Restaurant = require("../model/restaurant.model")
const PostgresStore = require("../PostgresStore")

router.get('/restaurants', async (req,res)=>{

    const result = await Restaurant.getAll()
    res.json(result)
})

module.exports = router