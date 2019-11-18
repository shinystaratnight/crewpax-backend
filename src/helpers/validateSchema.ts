import joi from 'joi'

export default function (schema: any) {
  return function (ctx: any, next: any) {
    const validatedRequest = joi.validate(
      ctx.request.headers["content-type"].includes('application/json') ? ctx.request.body : ctx.request.body.json,
      schema
    )
    
    if (validatedRequest.error) {
      ctx.status = 400
      ctx.body = 'Bad Request'
      return ctx
    }

    return next()
  }
}