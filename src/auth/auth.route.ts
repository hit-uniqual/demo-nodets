import { Router } from 'express'
import asyncWrap from 'express-async-wrapper'
import { AuthController } from './auth.controller';
import { Validator } from '../common/config/validator';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import authenticate from '../common/middleware/authenticate';

const validator = new Validator()
const authController = new AuthController()
const router: Router = Router()

router.post("/register", validator.validate(RegisterUserDto), asyncWrap(authController.register))
router.post("/login", validator.validate(LoginUserDto), asyncWrap(authController.login))
router.post("/change-password", authenticate, asyncWrap(authController.changePassword))

export const authRoutes: Router = router