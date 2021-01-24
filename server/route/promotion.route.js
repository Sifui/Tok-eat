const router = require("express").Router()
const PostgresStore = require("../PostgresStore")
const hasToBeAuthenticated = require('../middlewares/has-to-be-authenticated.middleware')
const Promo = require("../model/promo.model")

router.get('/promo/:id' ,async (req,res)=>{
    console.log("test promo")
    console.log(req.params.id)
    const result = await Promo.getByIdRestaurant(req.params.id)
    res.json(result)
})

router.get('/promo' ,async (req,res)=>{
    const result = await Promo.getByIdRestaurant(req.session.userId)
    res.json(result)
})

router.post('/promo', hasToBeAuthenticated, async (req,res)=>{
    let promo = req.body
    promo.id_restaurant = req.session.userId
    const result = await Promo.create(promo)
    res.json(result)
})

router.delete('/promo', hasToBeAuthenticated, async (req,res)=>{
    let id = {promo:req.body.id, restaurant:req.session.userId}
    const result = await Promo.deleteSafe(id)
    res.json(result)
})
router.put('/promo', hasToBeAuthenticated, async (req,res)=>{
    let promo = req.body.promo
    promo.id_restaurant = req.session.userId
    const result = await Promo.updateSafe(promo)
    res.json(result)
})
module.exports = router