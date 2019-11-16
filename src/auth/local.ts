import { Strategy as LocalStrategy } from 'passport-local'
import * as bcrypt from 'bcryptjs'
import validator from 'email-validator'

import database from '../database'

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
            `SELECT * FROM users WHERE email = $1 OR phone = $1`,
            [username]
          )
          if (response.length === 0) {
            console.log("Bad user email or phone number")
            return done(null, false)
          }

          const isCorrectPassword = await bcrypt.compare(
            password,
            response[0].password
          )

          if (!isCorrectPassword) {
            console.log("Password is incorrect")
            return done(null, false)
          }

          return done(null, response[0])
        } catch (err) {
          console.error(err)
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
      (username, password, done) => {
        try {
          if (validator.validate(username)) {
            console.log("This is email register")
          } else {
            console.log("This is a mobile number")
          }
          // User.findOne({
          //   where: {
          //     username: username,
          //   },
          // })
          // .then(user => {
          //   if (user !== null) {
          //     console.log('username already exists')
          //     return done(null, false, { message: 'username already taken' })
          //   } else {
          //     bcrypt.hash(password, BCRYPT_SALT_ROUNDS)
          //       .then(user => {
          //         console.log('user created')
          //         return done(null, user)
          //       })
          //   }
          // })
          done(null, false)
        } catch (err) {
          done(err)
        }
      }
    )
  )
}