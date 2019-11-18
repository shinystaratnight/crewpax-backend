import { Controller, Get, Post } from 'koa-router-ts'
import joi from 'joi'

import '../../auth/local'
import '../../auth/jwt'
import login from './login'
import register from './register'
import validator from '../../helpers/validateSchema'

const schema = joi.object()
  .keys({
    username: joi.string()
      .min(7)
      .max(70)
      .required(),
    password: joi.string()
      .min(6)
      .regex(/[a-z]/)
      .regex(/[A-Z]/)
      .regex(/\d+/)
      .required()
  })

@Controller('/api/users')
export default class {

  @Post('/login')
  async postLogin(ctx: any, next: any) {
    return login(ctx, next)
  }

  @Post('/register', validator(schema))
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