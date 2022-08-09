import GeneralError from './general-error'
import { HTTP_FORBIDDEN } from '../../constants'

class ForbiddenException extends GeneralError {
  constructor(message) {
    super()
    this.message = HTTP_FORBIDDEN + ': ' + message
  }
}

export default ForbiddenException
