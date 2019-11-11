import * as Koa from 'koa'
import * as Router from 'koa-router'
import * as bodyParser from 'koa-bodyparser'

import * as logger from 'koa-logger'
import * as json from 'koa-json'

const app = new Koa()
const router = new Router()

// Middlewares
app.use(json())
app.use(logger())
app.use(bodyParser())

// Index Route
router.get('/', async (ctx, next) => {
  ctx.body = { msg: 'Welcome to CrewPAX' }

  await next()
})

// Routes
app.use(router.routes()).use(router.allowedMethods())

app.listen(3000, () => {
  console.log("Koa started ...")
})