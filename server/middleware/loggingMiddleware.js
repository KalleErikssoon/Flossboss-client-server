function logWorker(req, res, next) {
    console.log(`Worker ${process.pid} handling request for ${req.originalUrl}`);
    next();
}

module.exports = logWorker;