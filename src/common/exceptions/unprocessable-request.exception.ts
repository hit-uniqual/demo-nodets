import GeneralError from './general-error'

class UnprocessableException extends GeneralError {
  constructor(message) {
    super()
    this.message = message
  }
}

export default UnprocessableException
