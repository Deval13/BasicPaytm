const { JWT_SECRET } =  require("../config");
const jwt = require('jsonwebtoken');

function authorizeUser(req, res, next) {
    const authHeader = req.headers.authorization
    console.log("auth header is " + authHeader);
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(403).json({
            msg : "No token"
        })
    }

    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, JWT_SECRET)
        if (decoded.userId) {
            req.userId = decoded.userId
            next()
        }
        else {
            return res.status(403).json({
                msg:"You are not authorized !! "
            })
        }
    }
    catch (err) {
        return res.status(403).json({msg:"You are not authorized !!"})
    }
}

module.exports = {
    authorizeUser
}
