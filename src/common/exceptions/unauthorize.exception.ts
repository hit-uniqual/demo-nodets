import GeneralError from './general-error'
import { HTTP_UNAUTHORIZE } from '../../constants'

class UnauthorizeException extends GeneralError {
  constructor(message) {
    super()
    this.message = HTTP_UNAUTHORIZE + ': ' + message || 'Unauthenticated.'
  }
}

export default UnauthorizeException
