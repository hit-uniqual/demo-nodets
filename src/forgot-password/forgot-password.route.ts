import { Router } from 'express'
import asyncWrap from 'express-async-wrapper'
import { ForgotPasswordController } from './forgot-password.controller';
import { Validator } from '../common/config/validator';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ForgotPasswordVerifyOtpDto } from './dto/forgot-password-verify-otp.dto';
import { ForgotPasswordNewPasswordDto } from './dto/forgot-password-new-password.dto';

const validator = new Validator()
const forgotPasswordController = new ForgotPasswordController()
const router: Router = Router()

router.post(
    '/',
    validator.validate(ForgotPasswordDto),
    asyncWrap(forgotPasswordController.forgotPassword)
  )
  
  router.post(
    '/verify-otp',
    validator.validate(ForgotPasswordVerifyOtpDto),
    asyncWrap(forgotPasswordController.verifyOtp)
  )
  
  router.post(
    '/new-password',
    validator.validate(ForgotPasswordNewPasswordDto),
    asyncWrap(forgotPasswordController.newPassword)
  )

export const forgotPasswordRoutes: Router = router