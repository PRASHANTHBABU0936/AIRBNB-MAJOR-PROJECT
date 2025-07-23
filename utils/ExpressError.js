class ExpressError extends Error {
    constructor(statusCode, message) {
        super();
        this.statusCode = statusCode; // ✅ correct
        this.message = message;
    }
}

module.exports = ExpressError;
