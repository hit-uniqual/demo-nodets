import { Request } from 'express'
import knex from 'knex'
import { hash } from 'bcrypt'
import moment from 'moment'
import forgotPasswordSendMail from '../common/forgot-password-send-mail'
import BadRequestException from '../common/exceptions/bad-request.exception'
import NotFoundException from '../common/exceptions/not-found.exception'

export class ForgotPasswordService {

  public async forgotPassword(req:Request) {
    if (req.body) {
      const user = await knex('users').where('email', req.body.email).first()

      if (!user) throw new BadRequestException('Please fill correct email')

      const otp = Math.floor(100000 + Math.random() * 9000)

      await knex('users')
        .where('id', user.id)
        .update({
          passwordVerificationCode: otp,
          passwordVerificationExpiryTime: moment()
            .add(10, 'minutes')
            .format('YYYY-MM-DD HH:mm:ss'),
        })

      await forgotPasswordSendMail(
        { otp, email: user.email }
      )
    }
  }

  public async verifyOtp(req:Request) {
    const user = await knex('users')
      .where('email', req.body.email)
      .where('passwordVerificationCode', req.body.otp)
      .first()

    if (!user) throw new NotFoundException('Invalid Otp')

    const expireAt = user.passwordVerificationExpiryTime
    const now = moment().format('YYYY-MM-DD HH:mm:ss')

    if (expireAt.toString() < now.toString())
      throw new NotFoundException('Otp is expired')

    await knex('users').where('id', user.id).update({
      passwordVerificationCode: null,
      passwordVerificationExpiryTime: null,
    })
  }

  public async newPassword(req:Request) {
    let user = await knex('users').where('email', req.body.email).first()

    if (!user) throw new NotFoundException('User Is invalid')

    const now = moment().format('YYYY-MM-DD HH:mm:ss')

    await knex('users')
      .where('id', user.id)
      .update({
        password: await hash(req.body.password, 10),
        updatedAt: now,
      })
  }
}
