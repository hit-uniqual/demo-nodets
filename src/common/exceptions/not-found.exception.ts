import GeneralError from './general-error'

class NotFoundException extends GeneralError {
  constructor(message) {
    super()
    this.message = message
  }
}

export default NotFoundException
