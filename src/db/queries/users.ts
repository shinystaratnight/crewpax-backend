import User from '../../models/User'
import knex from '../connection'

export async function insertUser(user: User) {
  return knex('users')
    .insert(user)
    .returning('id')
}

export async function fetchUser(username: string) {
  return knex('users')
    .select('*')
    .where('email', username)
    .orWhere('mobile', username)
}