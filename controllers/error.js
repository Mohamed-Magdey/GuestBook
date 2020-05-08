function errorHandler(err, req, res) {
    return res.status(err.status || 500).json({
        error: {
            message: err.message || "Oops!!! Something went wrong."
        }
    });
}

module.exports = errorHandler;