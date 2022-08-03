const User = require("../models/user");
const jwt = require("json-web-token");

async function defineCurrentUser(req, res, next) {
    try {
        const [ method, token ] = req.headers.authorization.split(" ")
        if( method == 'Bearer' ){
            const result = await jwt.decode(process.env.JWT_SECRET, token)
            const { id } = result.value
            let user = await User.findOne({ 
                where: {_id: id},
                attributes: ["_id", "email"]
            })
            req.currentUser = user
        }
        next()
    } catch(err){
        req.currentUser = null
        next() 
    }
}

module.exports = defineCurrentUser;