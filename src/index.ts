import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import logger from 'koa-logger'
import json from 'koa-json'
import render from 'koa-ejs'
import serve from 'koa-static'
import * as path from 'path'
import { loadControllers } from 'koa-router-ts'

const app = new Koa()

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

// Configure layout file and view settings
render(app, {
  root: path.join(__dirname, 'admin/views'),
  layout: 'layout',
  viewExt: 'html',
  cache: false,
  debug: false
})

const router = loadControllers(path.join(__dirname, 'api'), { recurse: true })

// Add all the routes
app.use(router.routes()).use(router.allowedMethods())

// Start Server
const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`CrewPAX running in Node + Koa at port on port ${port}`)
})