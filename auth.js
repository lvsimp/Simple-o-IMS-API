//imports
require('dotenv').config();
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = process.env;


//creating token for logged users
module.exports.createAccessToken = user => {
    const data = {
        id : user.id,
        name: user.first_name,
        role: user.role,
        avatar : user.image
    }
    return jwt.sign(data, JWT_SECRET, {});
}

//verifying users
module.exports.verify = (req, res, next) =>{

    const token = req.headers.authorization.split(' ')[1];

    if(token && jwt.verify(token, JWT_SECRET)){
        req.user = jwt.decode(token);
        next();
    }else{
        next();
    }

}
//verify admin or owner
module.exports.verifyAdmin = (req, res, next) => {
    
    if(req.user.role === 'Admin'){
        next();
    }else{
        return res.status(400).send({auth: "Failed", message: "Action Forbidden"})
    }
}