import GeneralError from './general-error'

class BadRequestException extends GeneralError {
  constructor(message) {
    super()
    this.message = message
  }
}

export default BadRequestException
