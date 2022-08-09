import GeneralError from './general-error'
import { HTTP_CONFLICT } from '../../constants'

class ConflictException extends GeneralError {
  constructor(message) {
    super()
    this.message = HTTP_CONFLICT + ': ' + message
  }
}

export default ConflictException
