import { Controller, Get, Post } from 'koa-router-ts'
import passport from 'koa-passport'

import localAuth from '../auth/local'
localAuth(passport)

@Controller('/api/users')
export default class {

  @Post('/login')
  async login(ctx: any, next: any) {
    passport.authenticate('login')(ctx, next)
  }

  @Post('/register')
  async register(ctx: any, next: any) {
    passport.authenticate('register')(ctx, next)
  }
}