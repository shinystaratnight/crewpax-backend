import passport from 'koa-passport'
import { Controller, Get, Post } from 'koa-router-ts'

@Controller('/admin')
export default class {
  //.use(authorizedMiddleware)
  @Get('/')
  async index(ctx: any) {
    ctx.body = 'Hello, this is admin home page'
  }

  @Get('/login')
  async loginPage(ctx: any) {
    await ctx.render('login')
  }
  
  @Post('/login')
  async login(ctx: any) {
    passport.authenticate('local', {
      successRedirect: '/index',
      failureRedirect: '/users/login',
      failureFlash: true
    })
  }
}