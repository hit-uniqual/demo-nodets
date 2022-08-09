import { Request, Response } from 'express'
import knex from '../common/config/database.config'
import passport from 'passport'
import { decode } from 'jsonwebtoken'
import moment from 'moment'
import bcrypt, { hash } from 'bcrypt'
import AccessTokensService from '../access-tokens/access-tokens.service'
import RefreshTokensService from '../refresh-tokens/refresh-tokens.service'
import NotFoundException from '../common/exceptions/not-found.exception'
import ConflictHttpException from '../common/exceptions/conflict-request.exception'
import { HTTP_UNAUTHORIZE } from '../constants'

export class AuthService {
  public async register(req: Request, res: Response) {
    const checkUserExist = await knex('users')
      .where('email', req.body.email)
      .first()

    if (checkUserExist)
      throw new ConflictHttpException(
        'An account already exists with this email address'
      )

    const [userId] = await knex('users').insert({
      email: req.body.email,
      password: await hash(req.body.password, 10),
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    })

    const user = await knex('users').where('id', userId).first()

    const authentication = await this.generateTokenPairs(user.id, user.email)

    if (user) {
      res.json({
        data: {
          authentication,
        },
      })
    }
  }

  async generateTokenPairs(userId, email: String) {
    const accessToken = await AccessTokensService.createToken(userId, email)

    const decodedToken = decode(accessToken)

    const refreshToken = await RefreshTokensService.createToken(
      decodedToken.jti,
      decodedToken.exp
    )

    return {
      accessToken,
      refreshToken,
      expireAt: decodedToken.exp,
    }
  }

  async login(req: Request, res: Response, next) {
    passport.authenticate('local', async (err, user, message) => {
      if (err) return next(err)

      if (!user) {
        return res.status(HTTP_UNAUTHORIZE).json({
          message,
        })
      }

      const authentication = await this.generateTokenPairs(user.id, user.email)

      return res.json({
        data: {
          authentication,
        },
      })
    })(req, res, next)
  }

  async changePassword(req: Request) {
    const user = await knex('users').where('id', req.user.id).first()

    if (!user) throw new NotFoundException('User Is invalid')

    const hashedPasswordMatch = await new Promise((resolve, reject) => {
      console.log(req.body.oldPassword, user.password)
      bcrypt.compare(req.body.oldPassword, user.password, (err, response) => {
        if (err) reject(err)
        resolve(response)
      })
    })

    if (hashedPasswordMatch) {
      const now = moment().format('YYYY-MM-DD HH:mm:ss')

      await knex('users')
        .where('id', user.id)
        .update({
          password: await hash(req.body.password, 10),
          updatedAt: now,
        })

      return true
    }
    throw new ConflictHttpException('Current password does not match')
  }
}
