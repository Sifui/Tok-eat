const router = require("express").Router()
const Restaurant = require("../model/restaurant.model")

router.get('/restaurants', async (req,res)=>{

    const result = await Restaurant.getAll()
    res.json(result)
})
router.get('/restaurants/search/:name', async (req,res)=>{

    const result = await Restaurant.findByName(req.params.name)
    res.json(result)
})
router.get('/restaurants/trends/:name', async (req,res)=>{

    const result = await Restaurant.findTrendsByName(req.params.name)
    res.json(result)
})

router.get('/restaurants/:id', async (req,res)=>{

    const result = await Restaurant.getById(req.params.id)
    res.json(result)
})

router.post('/restaurants', async (req,res)=>{

    const result = await Restaurant.create(req.body)
    res.json(result)
})
module.exports = router