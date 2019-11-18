import twilio from 'twilio'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({
  path: path.resolve(__dirname, "../.env")
})

const accountSid = process.env.TWILIO_SENDER_ID
const authToken = process.env.TWILIO_AUTH_TOKEN

const client = twilio(accountSid, authToken)

export default async ({ to, body, mediaUrl }: { to: string, body: string, mediaUrl: string}) => {
  try {
    const message = await client.messages
      .create({
        to,
        from: '+15005550006',
        body,
        mediaUrl,
      })
  
    return message
  } catch (err) {
    return err
  }
}