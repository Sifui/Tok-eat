const router = require("express").Router()
const hasToBeAuthenticated = require("../middlewares/has-to-be-authenticated.middleware")
const ClientRestaurant= require("../model/client_restaurant.model")

router.post('/client-restaurant',hasToBeAuthenticated,async(req,res)=>{
    let feedback = req.body
    feedback.clientId = req.session.userId
    const result = await ClientRestaurant.create(feedback)
    res.json(result)
})
router.get('/client-restaurant/top-rated', async (req,res)=>{

    const result = await ClientRestaurant.getTopRated()
    res.json(result)
})
router.get('/client-restaurant/:id',async(req,res)=>{
    console.log('req.params',req.params)
    const result = await ClientRestaurant.get(req.params.id)
    res.json(result)
})

router.get('/client-restaurant/client/favorites',hasToBeAuthenticated,async(req,res)=>{
    const result = await ClientRestaurant.getFavoritesByClientId(req.session.userId)
    res.json(result)
})

router.put('/client-restaurant/:id',hasToBeAuthenticated,async(req,res)=>{
   let feedback = req.body
   feedback.clientId = req.session.userId
   const result = await ClientRestaurant.set(feedback)
    
    res.json(result)
})

router.get('/client-restaurant/average/:id', async (req,res)=>{

    const result = await ClientRestaurant.getAverage(req.params.id)
    res.json({average:result})
})


module.exports = router