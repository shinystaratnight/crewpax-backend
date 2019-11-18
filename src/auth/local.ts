import passport from 'koa-passport'
import { Strategy as LocalStrategy } from 'passport-local'
import bcrypt from 'bcryptjs'
import validator from 'email-validator'

import generateCode from '../helpers/generateCode'
import sendVerificationCode from '../helpers/sendVerificationCode'
import User from '../models/User'
import { insertUser, fetchUser } from '../db/queries/users'
import '../lib/env'

passport.use(
  'login',
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
      session: false
    },
    async (username, password, done) => {
      try {
        const users = await fetchUser(username)
        
        if (users.length === 0) {
          return done(null, false, { message: '1' }) // Incorrect email address or mobile number
        }

        const user = users[0]
        const isCorrectPassword = await bcrypt.compare(
          password,
          user.password
        )

        if (!isCorrectPassword) {
          console.log("Password is incorrect")
          return done(null, false, { message: '2' }) // Incorrect password
        }

        if (!user.verified) {
          console.log("This user has not been verified yet")
          return done(null, false, { message: '3' }) // Not verified user
        }

        return done(null, user)
      } catch (err) {
        return done(err)
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
        
        newUser.password = await bcrypt.hash(password, Number(process.env.BCRYPT_SALT_ROUNDS))
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