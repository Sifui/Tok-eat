const router = require("express").Router()
const orderedProduct = require("../model/ordered_product.model")
const hasToBeAuthenticated = require('../middlewares/has-to-be-authenticated.middleware')
router.post('/ordered_product', hasToBeAuthenticated, async (req,res)=>{
    let product = req.body
    product.basketId = req.session.basketId
    const result = await orderedProduct.create(product)
    res.json(result)
})
router.get('/ordered_products/restaurant', hasToBeAuthenticated,async (req,res)=>{

    const result = await orderedProduct.getByMe(req.session.userId)
    res.json(result)
})
module.exports = router