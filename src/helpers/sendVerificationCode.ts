import sendEmailCode from './sendEmailCode'
import sendMobileCode from './sendMobileCode'
import User from '../models/User'

export default async (user: User) => {
  if (user.email) {
    const html =  `<div style="display: flex; flex-direction: column; justify-content: center; align-items: center;">` +
                    `<div style="display: block;"><img src="./logo.png"></div>` + 
                    `<div style="display: block;"><h2>Your Email Verification Code</h2></div>` +
                    `<div style="display: block;"><h3>${user.verification_code}</h3></div>` +
                  `</div>`
    const emailResponse = await sendEmailCode({
      to: user.email,
      subject: "Email Verification Code",
      text: "",
      html: html,
    })
    
    console.log("Email verification code has successfully been sent")
    console.log(emailResponse)
  } else if (user.mobile) {
    const message = await sendMobileCode({
      to: user.mobile,
      body: `Your Verificatin Code is ${user.verification_code}`,
      mediaUrl: 'https://climacons.herokuapp.com/clear.png'
    })
    
    console.log("Mobile verification code has successfully been sent")
    console.log(message)
  } else {
    console.log("Incorrect email address or mobile number")
  }
}