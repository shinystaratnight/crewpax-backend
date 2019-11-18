import { Strategy as LocalStrategy } from 'passport-local'
import bcrypt from 'bcryptjs'
import validator from 'email-validator'

import database from '../database'
import generateCode from '../helpers/generateCode'
import sendVerificationCode from '../helpers/sendVerificationCode'
import User from '../models/User'
import { insertUser } from '../db/queries/users'

const BCRYPT_SALT_ROUNDS = 12

export default function (passport: any) {
  passport.use(
    'login',
    new LocalStrategy(
      {
        usernameField: 'username',
        passwordField: 'password',
        session: false
      },
      async (username, password, done) => {
        const client = await database.connect()

        try {
          const { rows: response } = await client.query(
            `SELECT * FROM users WHERE email = $1 OR mobile = $1`,
            [username]
          )
          if (response.length === 0) {
            return done(null, false, { message: 'Incorrect email address or mobile number' })
          }

          const isCorrectPassword = await bcrypt.compare(
            password,
            response[0].password
          )

          if (!isCorrectPassword) {
            console.log("Password is incorrect")
            return done(null, false, { message: "Password is incorrect" })
          }

          return done(null, response[0])
        } catch (err) {
          return done(err)
        } finally {
          await client.release()
        }
      }
    )
  )

  passport.use(
    'register', new LocalStrategy(
      {
        usernameField: 'username',
        passwordField: 'password',
        session: false,
      },
      async (username, password, done) => {
        const code = generateCode()
        
        let newUser: User = {
          password: password,
          verified: false,
          verification_code: code
        }

        try {
          const isEmail = validator.validate(username) ? true : false
          if (isEmail) {
            newUser.email = username
          } else {
            newUser.mobile = username
          }
          
          newUser.password = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS)
          const user = await insertUser(newUser)
          console.log("New user created")   

          sendVerificationCode(newUser)
          
          return done(null, user[0])
        } catch (err) {
          if (
            err.constraint === 'users_email_key' ||
            err.constraint === 'users_phone_key'
          ) {
            return done(null, false, { message: 'User with this email address or mobile number already exists'})
          }
          return done(err)
        }
      }
    )
  )
}