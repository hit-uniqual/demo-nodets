import { Request, Response } from 'express'
import { HTTP_OK } from '../constants'
import { AuthService } from './auth.service'

const authService = new AuthService()

export class AuthController {
  public async register(req: Request, res: Response) {
    const authentication = await authService.register(req, res)

    res.status(HTTP_OK).json({
      success: true,
      message: 'User registered successfully',
      data: {
        authentication,
      },
    })
  }

  public async login(req: Request, res: Response, next) {
    await authService.login(req, res, next)
  }

  public async changePassword(req: Request, res: Response) {
    await authService.changePassword(req)

    return res.status(HTTP_OK).send({
      success: true,
      message: 'Password has been changed successfully',
    })
  }
}
