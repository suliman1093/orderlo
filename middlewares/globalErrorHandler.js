const globalErrorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error'
    if (process.env.NODE_ENV == 'development')
        return sendErrorForDev(err, res);
    return sendErrorForProd(err, res);
};



const sendErrorForDev = (err, res) => {
    return res.status(err.statusCode).json({
        status: err.status,
        err: err,
        message: err.message,
        stack: err.stack
    });
};

const sendErrorForProd = (err, res) => {
    return res.status(err.statusCode).json({
        status: err.status,
        message: err.message
    });
};


module.exports = globalErrorHandler;