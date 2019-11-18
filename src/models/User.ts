export default interface User {
  password: string
  email?: string
  mobile?: string
  verified: boolean
  verification_code: string
}