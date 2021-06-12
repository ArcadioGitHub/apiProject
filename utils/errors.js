class GeneralError extends Error {
  constructor(message) {
    super();
    this.message = message;
  }

  getCode() {
    if (this instanceof BadRequest) return 400;
    if (this instanceof NotFound) return 404;
    if (this instanceof ServerError) return 500;
  }
}

class BadRequest extends GeneralError {
}

class NotFound extends GeneralError {
}

class ServerError extends GeneralError {
}

const handleErrors = (err, req, res, next) => {
  if (err instanceof GeneralError) {
    return res.status(err.getCode()).json({
      status: 'error',
      message: err.message
    });
  }

  return res.status(500).json({
    status: 'error',
    message: err.message
  });
}

export default {
  GeneralError,
  BadRequest,
  NotFound,
  ServerError,
  handleErrors
};

