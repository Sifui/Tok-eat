const router = require('express').Router()
const Category = require('../model/category.model')

router.get('/category/:id',async(req,res)=>{
    const result = await Category.get(req.params.id)
    console.log(result)
    res.json(result)
})

module.exports = router