import { Pool } from 'pg'
import path from 'path'
import dotenv from 'dotenv'

// .env
dotenv.config({
  path: path.resolve(__dirname, "../.env")
})

export default new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
})