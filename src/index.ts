import * as Koa from 'koa'
import * as Router from 'koa-router'
import * as bodyParser from 'koa-bodyparser'

import * as logger from 'koa-logger'
import * as json from 'koa-json'

import * as dotenv from 'dotenv'
import * as path from 'path'

dotenv.config({
  path: path.resolve(__dirname, "../.env")
})

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

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`CrewPAX running in Node + Koa at port on port ${port}`)
})