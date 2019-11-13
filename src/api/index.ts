import * as Router from 'koa-router'

import usersRouter from './users'
import jobsRouter from './jobs'

export default new Router({
  prefix: '/api'
})
//.use(authorizedMiddleware)
.use(usersRouter.routes(), usersRouter.allowedMethods())
.use(jobsRouter.routes(), jobsRouter.allowedMethods())
// Extend nested routes here