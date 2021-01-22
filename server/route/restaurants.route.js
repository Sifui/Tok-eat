const router = require("express").Router()
const hasToBeAuthenticated = require("../middlewares/has-to-be-authenticated.middleware")
const Restaurant = require("../model/restaurant.model")

router.post('/restaurants',hasToBeAuthenticated, async (req,res)=>{
    if ( req.session.type != 'restaurant')
    {
        res.status(401)
        res.send({
            message: 'Vous n\'êtes pas un restaurant'
        })
        return
    }
    const result = await Restaurant.create(req.body)
    res.json(result)
})
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
router.get('/restaurants/:id/sales',hasToBeAuthenticated, async (req,res)=>{

    const result = await Restaurant.getSales(req.session.userId)
    res.json(result)
})
router.get('/restaurants/:id/salesPerMonth',hasToBeAuthenticated, async (req,res)=>{

    const result = await Restaurant.getSalesPerMonth(req.session.userId)
    res.json(result)
})



module.exports = router