const router = require("express").Router()
const Client_Restaurant = require("../model/client_restaurant.model")
const ClientRestaurant= require("../model/client_restaurant.model")

router.post('/client-restaurant',async(req,res)=>{
    const result = await ClientRestaurant.create(req.body)
    res.json(result)
})
router.get('/client-restaurant/top-rated', async (req,res)=>{

    const result = await ClientRestaurant.getTopRated()
    res.json(result)
})
router.get('/client-restaurant/:id',async(req,res)=>{
    console.log(req.params.id)
    const result = await ClientRestaurant.get(req.params.id)
    console.log(result)
    res.json(result)
})


router.get('/client-restaurant/favorites/:id',async(req,res)=>{
    const result = await ClientRestaurant.getFavorites(req.params.id)
    console.log(result)
    res.json(result)
})
router.put('/client-restaurant/:id',async(req,res)=>{
   const result = await ClientRestaurant.set(req.body)
    
    res.json(result)
})

router.get('/client-restaurant/average/:id', async (req,res)=>{

    const result = await ClientRestaurant.getAverage(req.params.id)
    res.json({average:result})
})

router.get('/client-restaurant/token', async (req,res)=>{
    const result = await ClientRestaurant.getToken(req.params.id_client)
    res.json(result)
})

module.exports = router