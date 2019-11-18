import jwt from 'jsonwebtoken'
import '../lib/env'

export default function (data: any) {
  const opts: any = {}
  opts.expiresIn = 7776000 // jwt token expires in three months
  const secret = process.env.JWT_SECRET as string

  return jwt.sign({ ...data }, secret, opts)
}