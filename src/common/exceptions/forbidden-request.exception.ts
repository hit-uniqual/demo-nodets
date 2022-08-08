import GeneralError from './general-error'

class ForbiddenException extends GeneralError {
  constructor(message) {
    super()
    this.message = message
  }
}

export default ForbiddenException
