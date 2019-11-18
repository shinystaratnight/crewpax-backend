import passport from 'koa-passport'

export default async (ctx: any, next: any)  => {
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
      ctx.status = 400
      ctx.body = info.message
    }
  })(ctx, next)
}