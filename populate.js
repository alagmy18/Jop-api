import { readFile } from 'fs/promises'

import connectDB from './db/connect.js'
import Job from './models/Job.js'

const  dotenv = require('dotenv') 
 dotenv.config()



const start = async () => {
    try {
      await connectDB( process.env.MONGOSE_CONNECT)
  
      const jsonProducts = JSON.parse(
        await readFile(new URL('./mock-data.json',import.meta.url))
      )
      await Job.create(jsonProducts)
      console.log('Success!!!!')
      process.exit(0)
    } catch (error) {
      console.log(error)
      process.exit(1)
    }
  }

  start()