import cors from 'cors'
import { Application } from 'express'

export class Cors {
  public static enable(app: Application): void {
    const whiteList = process.env.CORS_DOMAINS.split(',')

    var corsOption = {
      origin: function (origin, callback) {
        if (!origin || whiteList.indexOf(origin) != -1) {
          callback(null, true)
        } else {
          callback(new Error('Not allowed by CORS'))
        }
      },
    }

    app.use(cors(corsOption))
  }
}
