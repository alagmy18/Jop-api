
const {StatusCodes} = require('http-status-codes')
const CustoAPIError = require('./custom-api')



class BadRequestError extends CustoAPIError {
    constructor(message) {
        super(message)
        this.StatusCodes = StatusCodes.BAD_REQUEST
    }
}


module.exports = BadRequestError