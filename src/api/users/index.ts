import * as Router from 'koa-router'
import * as Login from './login'

export default new Router({
  prefix: '/users'
})
.get('/', Login.login)
.get('/phone', Login.loginWithMobile)
// add user routes here
