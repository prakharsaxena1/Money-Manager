const jwt = require('jsonwebtoken');

function authenticate(req, res, next) {
    const authHeader = req.headers.cookie
    const token = authHeader && authHeader.split('bearer%20')[1]
    if (token == null) return res.sendStatus(401)
    jwt.verify(token, process.env.TOKEN_SECRET, (err, value) => {
        if (err) {
            console.log(err)
            return res.sendStatus(403)
        }
        req.user = value;
        next()
    })
}

module.exports = {
    authenticate
}