const NotFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
}

const ErrorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message : err.message,
        statusCode: statusCode
    })
}

module.exports = {
    NotFound,
    ErrorHandler
}