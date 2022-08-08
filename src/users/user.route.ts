import { Router } from 'express'
import asyncWrap from 'express-async-wrapper'
import { UserController } from './user.controller'

const userController = new UserController()
const router: Router = Router()

router.put('/update-profile', asyncWrap(userController.updateProfile))
router.get('/get-profile', asyncWrap(userController.getProfile))

export const userRoutes: Router = router