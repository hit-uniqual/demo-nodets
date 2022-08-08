import GeneralError from './general-error'

class UnauthorizeException extends GeneralError {
  constructor(message) {
    super()
    this.message = message || 'Unauthenticated.'
  }
}

export default UnauthorizeException
