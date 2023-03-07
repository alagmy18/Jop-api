const CustoAPIError = require('./custom-api')
const {StatusCodes} = require('http-status-codes')


class NotFoundError extends CustoAPIError {
    constructor(message) {
        super(message)
        this.StatusCodes = StatusCodes.NOT_FOUND
    }
}


module.exports = NotFoundError