const CustomError = require("./custom-errors");
const { StatusCodes } = require("http-status-codes");

class BadRequestError extends CustomError {
  constructor() {
    super(this.message);
    this.StatusCodes = StatusCodes.BAD_REQUEST;
  }
}
