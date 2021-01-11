const router = require("express").Router()
const orderedProduct = require("../model/ordered_product.model")

router.post('/ordered_product', async (req,res)=>{

    const result = await orderedProduct.create(req.body)
    res.json(result)
})
router.get('/ordered_products/restaurant/:id', async (req,res)=>{

    const result = await orderedProduct.getByRestaurantId(req.params.id)
    res.json(result)
})
module.exports = router