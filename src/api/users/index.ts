import { Controller, Get, Post } from 'koa-router-ts'
import passport from 'koa-passport'

import localAuth from '../../auth/local'
import jwtAuth from '../../auth/jwt'
import { login } from './login'
import { register } from './register'

localAuth(passport)
// jwtAuth(passport)

@Controller('/api/users')
export default class {

  @Post('/login')
  async postLogin(ctx: any, next: any) {
    return login(ctx, next)
  }

  @Post('/register')
  async postRegister(ctx: any, next: any) {
    return register(ctx, next)
  }

  @Post('/forgot-password')
  async postForgotPassword(ctx: any, next: any) {
    ctx.body = "Forgot Password"
  }

  @Post('/confirm-email')
  async postConfirmEmail(ctx: any, next: any) {
    ctx.body = "Confirm Email address"
  }

  @Post('/confirm-mobile')
  async postConfirmMobile(ctx: any, next: any) {

  }
}