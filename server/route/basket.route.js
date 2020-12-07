const router = require('express').Router()
const Basket = require('../model/basket.model')

router.post('/basket',async(req,res)=>{
    const result = await Basket.create(req.body)
    res.json(result)
})

module.exports = router