import { Request, Response } from 'express';
import { ForgotPasswordService } from './forgot-password.service';

const forgotPasswordService = new ForgotPasswordService()

export class ForgotPasswordController {
    public async forgotPassword(req:Request, res:Response) {
        await forgotPasswordService.forgotPassword(req)

        return res.send({
            message: 'Please check your email inbox. We sent you an email on OTP'
        })
    }
    
    public async verifyOtp(req:Request, res:Response) {
        await forgotPasswordService.verifyOtp(req.body)
    
        return res.send({
          message: 'Otp is verified!',
        })
      }
    
    public async newPassword(req:Request, res:Response) {
        await forgotPasswordService.newPassword(req.body)
    
        return res.send({
          message: 'Password has been changed successfully',
        })
    }
}