import knex from 'knex'
import { Config } from 'knex'
import '../lib/env'

class Connection {
  public knex(): knex {
    return knex(exportConfig())
  }
}

function exportConfig(): Config {
  const environment = process.env.NODE_ENV || 'development'
  return require('../knexfile')[environment]
}

export default new Connection().knex()