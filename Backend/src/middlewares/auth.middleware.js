const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');

async function isLoggedIn(req, res, next){
    if(!req.cookies.token){
        return res.status(404).json({
            message: "You need to login first"
        })
    }
    const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET)
    const user = await userModel.findById(decoded.id).select("-password")
    if(!user){
        return res.status(404).json({
            message: "You need to login first"
        })
    }
    req.user = user
    next();
}

module.exports = isLoggedIn