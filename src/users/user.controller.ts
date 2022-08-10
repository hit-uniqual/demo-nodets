import { Request, Response } from 'express'
import { UserService } from './user.service'
import { castToStorage } from '../common/helper'
import UserModel from '../models/user.model'
import { HTTP_OK } from '../constants'

const userService = new UserService()

export class UserController {
  public async updateProfile(req: Request, res: Response) {
    const profileDetail = await userService.updateProfilePicture(req)
    res.status(HTTP_OK).json({
      success: true,
      data: castToStorage(profileDetail),
    })
  }

  public async getProfile(req: Request, res: Response) {
    const user = await userService.getProfile(req)

    return res.status(HTTP_OK).json({
      success: true,
      data: {
        ...new UserModel(user),
      },
    })
  }

  public async getProfileById(req: Request, res: Response) {
    const user = await userService.getProfileById(req)

    return res.status(HTTP_OK).json({
      success: true,
      data: {
        ...new UserModel(user),
      },
    })
  }

  public async getProfileAll(req: Request, res: Response) {
    const data = await userService.getProfileAll(req)

    return res.status(HTTP_OK).json({
      success: true,
      data,
    })
  }

  public async editProfile(req: Request, res: Response) {
    const user = await userService.editProfile(req)

    return res.status(HTTP_OK).json({
      success: true,
      data: {
        user,
      },
    })
  }

  public async deleteProfile(req: Request, res: Response) {
    const user = await userService.deleteProfile(req)
    
    return res.status(HTTP_OK).send({
      success: true,
      message: 'User has been changed successfully',
    })
  }
}
