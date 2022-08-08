import type { Knex } from 'knex'
import dotenv from 'dotenv'

dotenv.config({ path: '../.env' })

// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
  development: {
    client: process.env.DB_CONNECTION || 'mysql',
    connection: {
      host: process.env.DB_HOST || '127.0.0.1',
      user: process.env.DB_USERNAME || 'root',
      password: process.env.DB_PASSWORD || 'password',
      database: process.env.DB_NAME || 'node',
    },
    pool: {
      min: 2,
      max: 10,
    },
    seeds: {
      directory: `${__dirname}/seeds`,
    },
    migrations: {
      directory: `${__dirname}/migrations`,
    },
  },

  staging: {
    client: process.env.DB_CONNECTION || 'mysql',
    connection: {
      host: process.env.DB_HOST || '127.0.0.1',
      user: process.env.DB_USERNAME || 'root',
      password: process.env.DB_PASSWORD || 'password',
      database: process.env.DB_NAME || 'node',
    },
    pool: {
      min: 2,
      max: 10,
    },
    seeds: {
      directory: `${__dirname}/seeds`,
    },
    migrations: {
      directory: `${__dirname}/migrations`,
    },
  },

  production: {
    client: process.env.DB_CONNECTION || 'mysql',
    connection: {
      host: process.env.DB_HOST || '127.0.0.1',
      user: process.env.DB_USERNAME || 'root',
      password: process.env.DB_PASSWORD || 'password',
      database: process.env.DB_NAME || 'node',
    },
    pool: {
      min: 2,
      max: 10,
    },
    seeds: {
      directory: `${__dirname}/seeds`,
    },
    migrations: {
      directory: `${__dirname}/migrations`,
    },
  },
}

export default config
