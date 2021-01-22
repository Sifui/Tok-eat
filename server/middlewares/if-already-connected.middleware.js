function ifAlreadyAuthenticated (req, res, next) {
    if (req.session.userId) {
        res.status(401)
        res.send({
            message: 'You are already authenticated'
        })
        return
    }
    next()
}

module.exports = ifAlreadyAuthenticated