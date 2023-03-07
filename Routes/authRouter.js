const  express = require( 'express')
const router = express.Router()
const {register,login,updateUser} = require('../controller/authController') 
const authticatedUser = require('../Middleware/auth')

const rateLimiter  = require('express-rate-limit')

const apiLimiter = rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10,
    message: 'Too many requests from this IP, please try again after 15 minutes',
  })


router.route('/register').post(apiLimiter,register)

router.route('/login').post(apiLimiter,login) 


router.route('/updateUser').patch(authticatedUser,updateUser)

module.exports =  router 


