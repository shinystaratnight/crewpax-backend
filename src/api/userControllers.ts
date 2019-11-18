import { Controller, Get, Post } from 'koa-router-ts'
import passport from 'koa-passport'

import knex from 'knex'

import localAuth from '../auth/local'
localAuth(passport)

@Controller('/api/users')
export default class {

  @Post('/login')
  async login(ctx: any, next: any) {
    passport.authenticate('login', (err, user, info) => {
      if (user) {
        ctx.login(user)
      } else {
        ctx.status = 400
      }
    })(ctx, next)
  }

  @Post('/register')
  async register(ctx: any, next: any) {
    return passport.authenticate('register', (err, user, info) => {
      if (user) {
        ctx.status = 200
        ctx.body = user
      }
      if (err) {
        ctx.status = 500
        ctx.body = 'Internal Server Error'
      }
      if (info) {
        ctx.status = 200
        ctx.body = info.message
      }
    })(ctx, next)
  }

  @Post('/forgot-password')
  async forgotPassword(ctx: any, next: any) {
    ctx.body = "Forgot Password"
  }

  @Post('/confirm-email')
  async confirmEmail(ctx: any, next: any) {
    ctx.body = "Confirm Email address"
  }

  @Post('/confirm-mobile')
  async confirmMobile(ctx: any, next: any) {
    
  }
}