import { Router } from 'express'
import asyncWrap from 'express-async-wrapper'
import authenticate from '../common/middleware/authenticate'
import { UserController } from './user.controller'

const userController = new UserController()
const router:Router = Router()

router.put('/update-profile', authenticate, asyncWrap(userController.updateProfile))
router.get('/get-profile', authenticate, asyncWrap(userController.getProfile))
router.get('/get-profile/:id', authenticate, asyncWrap(userController.getProfileById))

export const userRoutes: Router = router
