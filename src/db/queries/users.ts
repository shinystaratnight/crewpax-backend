import Connection from '../connection'
import User from '../../models/User'

const knex = new Connection().knex()

export async function insertUser(user: User) {
  return knex('users')
    .insert(user)
    .returning('id')
}