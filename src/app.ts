import express from 'express'
import morgan from 'morgan'
import passport from 'passport'
import dotenv from 'dotenv'
import fileUpload from 'express-fileupload'
import swaggerUi from 'swagger-ui-express'
import YAML from 'yamljs'
import path from 'path'
import { config } from './constants'
import { Cors } from './common/cors';
import ApiRoutes from './routes/api.routes'
import WebRoutes from './routes/web.routes'
import errorHandler from './common/middleware/error.handler'
import routeNotFoundHandler from './common/middleware/route-not-found.handler'

import './common/passport/local.strategy'
import './common/passport/jwt.strategy'

dotenv.config()

export class App {
  protected app: express.Application

  constructor() {
    this.app = express()
        
    Cors.enable(this.app)

    const swaggerDocument = YAML.load(path.join(__dirname, '../swagger.yml'))

    this.app.use(morgan('dev'))
    this.app.use(express.json({ extended: true }))
    this.app.use(express.urlencoded({ extended: true })) // parse application/x-www-form-urlencoded
    this.app.use(passport.initialize())
    this.app.use(fileUpload())

    const apiRoutes = new ApiRoutes()
    const webRoutes = new WebRoutes()
    this.app.use('/api/v1/', apiRoutes.configure())
    this.app.use('/', webRoutes.configure())

    this.app.use(
      '/api/documentation',
      (req, res, next) => {
        swaggerDocument.info.title = process.env.APP_NAME
        swaggerDocument.servers = [
          {
            url: config.apiBaseUrl(),
            description: "Base url for API's",
          },
        ]
        req.swaggerDoc = swaggerDocument
        next()
      },
      swaggerUi.serve,
      swaggerUi.setup(swaggerDocument)
    )

    this.app.use(errorHandler)
    this.app.use('*', routeNotFoundHandler)

    this.app.listen(process.env.PORT, () => {
      console.log(`Listening to port ${process.env.PORT}`)
    })
  }
}
