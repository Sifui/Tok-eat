const hasToBeAuthenticated = require("../middlewares/has-to-be-authenticated.middleware")
const Token = require("../Model/token.model")

const router = require("express").Router()

router.get('/tokens',hasToBeAuthenticated,async(req, res) => {
    const result = await Token.getAllByClientId(req.session.userId)
    res.json(result)
})

module.exports = router