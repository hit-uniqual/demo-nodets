import { Request, Response } from 'express'
import { HTTP_OK } from '../constants'
import { ForgotPasswordService } from './forgot-password.service'

const forgotPasswordService = new ForgotPasswordService()

export class ForgotPasswordController {
  public async forgotPassword(req: Request, res: Response) {
    await forgotPasswordService.forgotPassword(req)

    return res.status(HTTP_OK).send({
      success: true,
      message: 'Please check your email inbox. We sent you an email on OTP',
    })
  }

  public async verifyOtp(req: Request, res: Response) {
    await forgotPasswordService.verifyOtp(req)

    return res.status(HTTP_OK).send({
      success: true,
      message: 'Otp is verified!',
    })
  }

  public async newPassword(req: Request, res: Response) {
    await forgotPasswordService.newPassword(req)

    return res.status(HTTP_OK).send({
      success: true,
      message: 'Password has been changed successfully',
    })
  }
}
