const router = require("express").Router()
const ClientRestaurant= require("../model/client_restaurant.model")
const PostgresStore = require("../PostgresStore")

router.post('/client-restaurant/feedback',async(req,res)=>{
    const result = await ClientRestaurant.create(req.body)
})
module.exports = router