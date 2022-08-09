import { Request } from 'express'
import knex from '../common/config/database.config'
import { deleteFile, storeAsSync } from '../common/helper'

export class UserService {
  public async updateProfilePicture(req: Request) {
    if (req.files.profilePicture.mimetype === ('image/png' || 'image/jpg')) {
      if (req.user.profilePicture) {
        deleteFile(req.user.profilePicture)
      }

      await knex('users')
        .where('id', req.user.id)
        .update({
          profilePicture: storeAsSync(
            'profilePicture',
            req.files.profilePicture.data,
            req.files.profilePicture.mimetype
          ),
        })

      const [profileDetail] = await knex('users')
        .where('id', req.user.id)
        .select('profilePicture')

      return profileDetail.profilePicture
    }
    throw new Error('Profile picture must be in png/jpg format')
  }

  public async getProfile(req: Request) {
    const user = await knex('users').where('id', req.user.id).first()

    return user
  }

  public async getProfileById(req: Request) {
    const id = req.params.id
    const user = await knex('users').where('id', id).first()

    return user
  }

  public async getProfileAll(req: Request) {
    const page = req.query.page

    const users = await knex('users')
      .select('id', 'profilePicture', 'firstName', 'lastName', 'email')
      .paginate({
        perPage: 10,
        currentPage: page,
      })

    return users
  }
}
