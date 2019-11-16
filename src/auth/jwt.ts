import { Strategy as jwtStrategy, ExtractJwt } from 'passport-jwt'
import * as passport from 'koa-passport'

module.exports = async (passport: any) => {
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
  }
  
  passport.use(
    'jwt',
    new jwtStrategy(opts, async (jwtPayload, done) => {
      try {
        // User.findOne({
        //   where: {
        //     username: jwtPayload.id,
        //   }
        // })
        // .then(user => {
        //   if (user) {
        //     console.log('user found in db in passport')
        //     done(null, user)
        //   } else {
        //     console.log('user not found in db')
        //     done(null, false)
        //   }
        // })
      } catch (err) {
        done(err)
      }
    })
  )
}