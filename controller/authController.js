const  User =  require('../Models/User') 
const {StatusCodes} = require('http-status-codes')
const {BadRequestError} = require('../errors/index')
const UnauthenticatedError = require('../errors/unauthenticated')


const register = async (req,res) => {
            const {name,email,password} = req.body 
            if(!name || !email || !password) {
                throw new BadRequestError('please provide all values ')
            }

            const isEmailExist = await User.findOne({email}) 
            if(isEmailExist) {
                throw new BadRequestError('email exist')
            }

            const user = await User.create({name,email,password}) 
            const token  = await user.createJWT()

            res.status(StatusCodes.OK).send({
                user:{
                    email:user.email,
                    lastName:user.lastName,
                    location:user.location,
                    name:user.name,
                }
            ,token})  
}


const login = async (req,res) => {
    
    const {email,password} = req.body 
    if(!email || !password) {
        throw new BadRequestError('please provide all values')
    }

    const user = await User.findOne({email}).select('+password') 
    if(!user) {
        throw new UnauthenticatedError('user dosnt exsit')
    }

    const isPasswordCorrect = await user.comparePassword(password)
    
    if(!isPasswordCorrect) {
        throw new UnauthenticatedError('Invalid Credentials')
    }

    const token = user.createJWT() 
    user.password

    res.status(StatusCodes.OK).json({user,token,location:user.location})

}

const updateUser = async (req,res) => {

    const { email, name, lastName, location} = req.body
    if (!email || !name || !lastName || !location) {
        throw new BadRequestError('Please provide all values')
        }
        
        const user = await User.findOne({ _id: req.user.userId })

        user.email = email
        user.name = name
        user.lastName = lastName
        user.location = location        
        await user.save()

        const token = user.createJWT()
        res.status(StatusCodes.OK).json({
            user,
            token,
            location: user.location,
        })

}


module.exports =  {register,login,updateUser}