import { Router } from 'express'
import { authRoutes } from '../auth/auth.route'
import { userRoutes } from '../users/user.route'
import { forgotPasswordRoutes } from '../forgot-password/forgot-password.route'

export default class ApiRoutes {
  public configure(): Router {
    const router = Router()

    router.use('/auth', authRoutes)
    router.use('/users', userRoutes)
    router.use('/forgot-password', forgotPasswordRoutes)

    return router
  }
}
