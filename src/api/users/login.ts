import passport from 'koa-passport'

export const login = async (ctx: any, next: any) => {
  return passport.authenticate('login', (err, user, info) => {
    if (user) {
      // ctx.login(user)
    } else {
      ctx.status = 400
    }
  })(ctx, next)
}