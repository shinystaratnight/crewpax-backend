import { Controller, Get } from 'koa-router-ts'

@Controller('/api/jobs')
export default class {

  @Get('/')
  async login(ctx: any) {
    ctx.body = 'Hi, I am jobs index page'
  }
}