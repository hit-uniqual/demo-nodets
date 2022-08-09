import { Validator } from '../common/config/validator'
import { Router } from 'express'
import asyncWrap from 'express-async-wrapper'
import authenticate from '../common/middleware/authenticate'
import { UserController } from './user.controller'
import { GetProfileByIdDto } from './dto/get-profile-by-id.dto'
import { EditProfileByIdDto } from './dto/edit-profile-by-id.dto'
import { DeleteProfileByIdDto } from './dto/delete-profile-by-id.dto'

const validator = new Validator()
const userController = new UserController()
const router: Router = Router()

router.put(
  '/update-profile',
  authenticate,
  asyncWrap(userController.updateProfile)
)
router.get('/get-profile', authenticate, asyncWrap(userController.getProfile))
router.get(
  '/get-profile/:id',
  authenticate,
  validator.validate(GetProfileByIdDto),
  asyncWrap(userController.getProfileById)
)
router.get(
  '/get-profile-all',
  authenticate,
  asyncWrap(userController.getProfileAll)
)
router.put(
  '/edit-profile/:id',
  authenticate,
  validator.validate(EditProfileByIdDto),
  asyncWrap(userController.editProfile)
)
router.delete(
  '/delete-profile/:id',
  authenticate,
  validator.validate(DeleteProfileByIdDto),
  asyncWrap(userController.deleteProfile)
)

export const userRoutes: Router = router
