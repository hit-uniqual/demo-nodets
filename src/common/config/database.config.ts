import knex from 'knex'
import { attachPaginate } from 'knex-paginate'
import config from '../../knexfile'

attachPaginate()

const knexConfig = knex(config.development)

export default knexConfig