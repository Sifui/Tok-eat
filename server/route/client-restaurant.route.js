const router = require("express").Router()
const ClientRestaurant= require("../model/client_restaurant.model")
const PostgresStore = require("../PostgresStore")

router.post('/client-restaurant',async(req,res)=>{
    const result = await ClientRestaurant.create(req.body)
})

router.get('/client-restaurant/:id',async(req,res)=>{
    console.log(req.params.id)
    const result = await ClientRestaurant.get(req.params.id)
    console.log(result)
    res.json(result)
})
module.exports = router