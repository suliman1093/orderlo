
const ApiError = require('../utils/apiError');

exports.routeMidlewareHandler = (req,res,next)=>{
    err = new ApiError('cannot find this page',404);
    next(err);
};