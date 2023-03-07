const  express = require( 'express')

const app = express()

const  notFoundMiddleware = require('./Middleware/not-found') 
const errorHandlerMiddleware = require('./Middleware/errorHandler')
const authticatedUser = require('./Middleware/auth')
const  connectDB = require('./db/connect')

//const { dirname } = require('path') 
//const  { fileURLToPath }   = require('url')
const  path = require('path') 
const  morgan = require('morgan')


require('express-async-errors')


const  dotenv = require('dotenv') 
 dotenv.config()

 const helmet = require('helmet')
 const xss = require('xss-clean')
 const mongoSanitize = require('express-mongo-sanitize')


// router 
const  authRouter = require('./Routes/authRouter') 
const  jobsRouter =  require('./Routes/jobRouter') 

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'))
}


app.use(express.static(path.resolve(__dirname, './client/build')))


app.use(express.json())
app.use(helmet())
app.use(xss())
app.use(mongoSanitize())


app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs', authticatedUser,jobsRouter)

// only when ready to deploy
app.get('*', function (request, response) {
  response.sendFile(path.resolve(__dirname, './client/build', 'index.html'))
})


 app.use(notFoundMiddleware)
 app.use(errorHandlerMiddleware)




  const port = process.env.PORT ||  5000

  const start = async () => {
    try {
     ;
    await connectDB( process.env.MONGOSE_CONNECT).then(()=> console.log('connect'))
     app.listen(port, () => {
       console.log(`Server is listening on port ${port}...`)
     })

      
    } catch (error) {
      console.log(error) 
    }
  }

  start()

