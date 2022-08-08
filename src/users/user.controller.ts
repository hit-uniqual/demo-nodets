import { Request, Response } from 'express';
import { UserService } from './user.service'
import { castToStorage } from '../common/helper';
import UserModel from '../models/user.model';

const userService = new UserService()

export class UserController{

    public async updateProfile(req:Request, res:Response) {
        const profileDetail = await userService.updateProfilePicture(req)
        res.json({
          data: castToStorage(profileDetail),
        })
      }
    
      public async getProfile(req:Request, res:Response) {
        const user = await userService.getProfile(req)
        
        return res.json({
          data: {
            ...new UserModel(user)
          }
        })
      }
}