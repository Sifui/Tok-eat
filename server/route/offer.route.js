const router = require("express").Router()
const Offer = require("../model/offer.model")
const Category = require("../model/category.model")
const PostgresStore = require("../PostgresStore")
const hasToBeAuthenticated = require('../middlewares/has-to-be-authenticated.middleware')

router.get('/offer/:id', async (req,res)=>{
    const result = await Offer.getByIdRestaurant(req.params.id)
    res.json(result)
})

router.get('/category/:id', async (req,res)=>{
    const result = await Category.getByIdRestaurant(req.params.id)
    res.json(result)
})

router.post('/offer', hasToBeAuthenticated, async (req,res)=>{
    const result = await Offer.create(req.body)
    res.json(result)
})

router.post('/category', hasToBeAuthenticated, async (req,res)=>{

    const result = await Category.create(req.body)
    res.json(result)
})

router.delete('/offer', hasToBeAuthenticated, async (req,res)=>{

    const result = await Offer.delete(req.body.id)
    res.json(result)
})

router.put('/offer', hasToBeAuthenticated, async (req,res)=>{
    const result = await Offer.modif(req.body)
    res.json(result)
})

router.put('/categories', hasToBeAuthenticated, async (req,res)=>{
    let result = []
    for(offer of req.body.categories)
    {
        result.push(await Category.update(offer))
    }
    res.json(result)
})

module.exports = router

