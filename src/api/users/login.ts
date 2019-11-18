import passport from 'koa-passport'
import jwtToken from '../../helpers/generateJwtToken'

export default async (ctx: any, next: any) => {
  return passport.authenticate('login', (err, user, info) => {
    if (user) {
      const token = jwtToken(user)
      ctx.status = 200
      ctx.body = {
        auth: true,
        token: token,
        message: 'User found and logged in'
      }
    } else {
      ctx.status = 400
      ctx.body = info.message
    }
  })(ctx, next)
}