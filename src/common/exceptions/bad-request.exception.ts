import GeneralError from './general-error'
import { HTTP_BAD_REQUEST } from '../../constants'

class BadRequestException extends GeneralError {
  constructor(message) {
    super()
    this.message = HTTP_BAD_REQUEST + ': ' + message
  }
}

export default BadRequestException
