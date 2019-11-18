import Connection from '../connection'

const knex = new Connection().knex()

export function addUser(user: any) {
  return knex('users')
    .insert(user)
    .returning('*')
}