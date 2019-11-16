module.exports = {

  development: {
    client: 'pg',
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
