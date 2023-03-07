
const jwt = require('jsonwebtoken')

const  {UnauthenticatedError}   = require('../errors/unauthenticated')

const auth = async (req,res,next) => {
    

    const authHeader = req.headers.authorization
    
    if(!authHeader || !authHeader.startsWith('Bearer')) {
        throw new UnauthenticatedError('authenticattion Invalid ')
    }
    const token = authHeader.split(' ')[1] 

    try {
        const paylaod = jwt.verify(token,process.env.JWT_SECRET)
       // console.log(paylaod)

        req.user = {userId:paylaod.userId}
        next()
    } catch (error) {
        throw new UnauthenticatedError('authenticattion Invalid')
    }
}

module.exports =  auth 