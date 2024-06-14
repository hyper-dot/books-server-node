import * as nodemailer from 'nodemailer'
let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'rozanpoudel@gmail.com',
    pass: 'mljd neqk dews ryxr',
  },
})

export async function sendOtp({ email, name, otp }) {
  // Setup email data
  let mailOptions = {
    from: '"Books" <rozanpoudel@gmail.com>',
    to: email,
    subject: 'OTP from Books',
    html: `<div style="width: 200px">
  <h1>Books</h1>
  <img
    src="https://static.scientificamerican.com/sciam/cache/file/1DDFE633-2B85-468D-B28D05ADAE7D1AD8_source.jpg?w=1200"
    alt="books"
    width="100"
    height="100"
    style="border: 1px solid gray; border-radius: 10px"
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
