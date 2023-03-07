const  express = require( 'express')

const router = express.Router()

const { createJob, deleteJob, getAllJobs, updateJob, showStats} = require('../controller/JobController')

router.route('/').post(createJob).get(getAllJobs)
// place before :id
router.route('/stats').get(showStats)

router.route('/:id').delete(deleteJob).patch(updateJob)



 module.exports =  router