import GeneralError from './general-error'
import { HTTP_NOT_FOUND } from '../../constants'

class NotFoundException extends GeneralError {
  constructor(message) {
    super()
    this.message = HTTP_NOT_FOUND + ': ' + message
  }
}

export default NotFoundException
