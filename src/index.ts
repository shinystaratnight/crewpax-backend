import * as Koa from 'koa'
import * as Router from 'koa-router'
import * as bodyParser from 'koa-bodyparser'
import * as logger from 'koa-logger'
import * as json from 'koa-json'
import * as render from 'koa-ejs'
import * as serve from 'koa-static'

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

// Serve static assets
app.use(serve(path.join(__dirname, 'admin/assets')))

// Error Handler
app.on('error', err => {
  console.log('server error', err)
})

render(app, {
  root: path.join(__dirname, 'admin/views'),
  layout: 'layout',
  viewExt: 'html',
  cache: false,
  debug: false
})

// Admin Index
router.get('/', async (ctx: Koa.ParameterizedContext) => {
  await ctx.render('index')
})

// Restful APIs
router.get('/api', async (ctx) => {
  ctx.body = "Welcome to CrewPAX"
})

// Routes
app.use(router.routes()).use(router.allowedMethods())

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`CrewPAX running in Node + Koa at port on port ${port}`)
})