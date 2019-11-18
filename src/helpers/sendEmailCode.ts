import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({
  path: path.resolve(__dirname, "../.env")
})

export default async ({ to, subject, text, html }: { to: string, subject: string, text: string, html: string }) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD
      }
    })

    const emailResponse = await transporter.sendMail({
      from: '"CrewPAX" <crewpaxapp@gmail.com>',
      to,
      subject,
      text,
      html,
    })

    return emailResponse
  } catch (err) {
    // console.log(err)
    return err
  }
}