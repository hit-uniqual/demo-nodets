import GeneralError from './general-error'

class ConflictException extends GeneralError {
  constructor(message) {
    super()
    this.message = message
  }
}

export default ConflictException
