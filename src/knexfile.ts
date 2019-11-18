import path from 'path'

const BASE_PATH = path.join(__dirname, 'src', 'db')

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://risingstar:postgres@localhost:5432/crewpax',
    migrations: {
      directory: path.join(BASE_PATH, 'migrations'),
    },
    seeds: {
      directory: path.join(BASE_PATH, 'seeds'),
    },
  },

  production: {
    client: 'pg',
    connection: {
      database: 'crewpax',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
