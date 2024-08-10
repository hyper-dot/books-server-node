import * as nodemailer from 'nodemailer'
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.NODEMAILER_AUTH_USER,
    pass: process.env.NODEMAILER_AUTH_PASS,
  },
})

export async function sendOtp({ email, name, otp }) {
  // Setup email data
  const mailOptions = {
    from: '"EZ Books" <noreply@books.com>',
    to: email,
    subject: 'OTP from Books',
    html: `<div style="width: 200px">
  <h1>EZ Books</h1>
  <img
    src="https://books.rosanpaudel.com.np/logo.png"
    alt="books"
    width="100"
    height="100"
  />
  <p>Dear ${name},</p>
  <p>
    Your OTP is
    <strong style="border: 1px solid gray; padding: 5px; border-radius: 5px"
      >${otp}</strong
    >
  </p>

  <p>Please keep this secret</p>
</div>`,
  }

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error occurred:', error.message)
      return
    }
    console.log('------------------------------------------------------------')
    console.log(`Email sent successfully to ${email} !!`)
    console.log('Message ID:', info.messageId)
    console.log('------------------------------------------------------------')
  })
}
