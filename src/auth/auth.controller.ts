import { Request, Response } from 'express'
import { AuthService } from './auth.service'

const authService = new AuthService()

export class AuthController {
  public async register(req: Request, res: Response) {
    await authService.register(req, res)
  }

  public async login(req: Request, res: Response, next) {
    await authService.login(req, res, next)
  }

  public async changePassword(req: Request, res: Response) {
    await authService.changePassword(req)

    return res.send({
      message: 'Password has been changed successfully',
    })
  }
}
