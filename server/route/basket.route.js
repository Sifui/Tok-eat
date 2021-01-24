const router = require('express').Router()
const Basket = require('../model/basket.model')
const hasToBeAuthenticated = require('../middlewares/has-to-be-authenticated.middleware')

router.post('/basket',hasToBeAuthenticated,async(req,res)=>{
    
    const result = await Basket.create(req.session.userId)
    req.session.basketId = result.id
    console.log("basket",req.session.basketId)
    res.json(result)
})
router.get('/basket',hasToBeAuthenticated,async(req,res)=>{
    
    const result = await Basket.getById(req.session.userId)
    res.json(result)
})
router.put('/basket/validate',hasToBeAuthenticated,async(req,res)=>{
    const currentBasket = req.session.basketId 
    if ( !currentBasket)
    {
        res.status(401)
        res.send({
            message: 'Vous n\'avez pas de panier en cours de validation'
        })
        return
    }
    const result = await Basket.validate(currentBasket)
    //req.session.basketId = null
    res.json(result)
})
router.put('/basket/cancel',hasToBeAuthenticated,async(req,res)=>{
    const currentBasket = req.session.basketId 
    if ( !currentBasket)
    {
        res.status(401)
        res.send({
            message: 'Vous n\'avez pas de panier en cours de validation'
        })
        return
    }
    const result = await Basket.cancel(currentBasket)
    req.session.basketId = null
    res.json(result)
})
module.exports = router