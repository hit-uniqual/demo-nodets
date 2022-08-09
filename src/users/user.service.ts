import { Request } from 'express'
import knex from '../common/config/database.config'
import { deleteFile, storeAsSync } from '../common/helper'

export class UserService {
  public async getProfile(req:Request) {
    console.log(req.user)
    const user = await knex('users').where('id', req.user.id).first()

    return user
  }

  public async getProfileById(req:Request) {
    const id = req.params.id
    console.log(id)
    const user = await knex('users').where('id', id).first()

    return user
  }

  public async updateProfilePicture(req:Request) {
    if (req.files.profilePicture.mimetype === ('image/png' || 'image/jpg')) {
      if (req.body.profilePicture) {
        deleteFile(req.body.profilePicture)
      }

      await knex('users')
        .where('id', req.body.id)
        .update({
          profilePicture: storeAsSync(
            'profilePicture',
            req.files.profilePicture.data,
            req.files.profilePicture.mimetype
          ),
        })

      const [profileDetail] = await knex('users')
        .where('id', req.body.id)
        .select('profilePicture')

      return profileDetail.profilePicture
    }
    throw new Error('Profile picture must be in png/jpg format')
  }
}
