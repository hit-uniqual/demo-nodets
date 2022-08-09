import GeneralError from './general-error'
import { HTTP_UNPROCESSABLE } from '../../constants'

class UnprocessableException extends GeneralError {
  constructor(message) {
    super()
    this.message = HTTP_UNPROCESSABLE + ': ' + message
  }
}

export default UnprocessableException
