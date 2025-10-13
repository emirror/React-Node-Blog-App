export default (err, req, res, next) => {
    console.error(err);

    const status = Number.isInteger(err.statusCode) ? err.statusCode : 500;
    res.status(status).json({
        status,
        message: err.message || 'Internal Server Error',
        stack: err.stack
    });
}