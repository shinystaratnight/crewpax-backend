import * as Router from 'koa-router'
import * as Fetch from './fetch'

export default new Router({
  prefix: '/jobs'
})
.get('/', Fetch.listAll)
// Add job routes here