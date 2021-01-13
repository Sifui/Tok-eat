const router = require('express').Router()
const Basket = require('../model/basket.model')

router.post('/basket',async(req,res)=>{
    const result = await Basket.create(req.body)
    res.json(result)
})
router.get('/basket/:id',async(req,res)=>{
    const result = await Basket.getById(req.params.id)
    res.json(result)
})
router.put('/basket/:id',async(req,res)=>{
    const result = await Basket.validateById(req.params.id)
    res.json(result)
})

module.exports = router