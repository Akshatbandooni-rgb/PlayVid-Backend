class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.timestamp = new Date().toISOString();
    Error.captureStackTrace(this, this.constructor);
  }
  toJson() {
    return {
      message: this.message,
      statusCode: this.statusCode,
      success: false,
      timestamp: this.timestamp,
      ...(process.env.NODE_ENV === "development"
        ? { stackTrace: this.stack }
        : {}),
    };
  }
}

module.exports = CustomError;
