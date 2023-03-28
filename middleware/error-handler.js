const CustomAPIError = require('../errors/custom-errors')
const { StatusCodes } = require("http-status-codes");

const errorHandlerMiddleware = (err, req, res, next) => {
    let customError = {
        // set default
        StatusCodes: err.StatusCodes || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || 'Something went wrong try again later',
    }

    if (err instanceof CustomAPIError) {
        return res.status(err.StatusCodes).json({ msg: err.message })
    }

    if (err.name === 'CastError') {
        customError.msg = `No item found with id : ${err.value}`
        customError.StatusCodes= 404
    }

    return res.status(customError.StatusCodes).json({ msg: customError.msg })
}

module.exports = errorHandlerMiddleware