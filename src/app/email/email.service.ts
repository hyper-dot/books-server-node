import nodemailer, { Transporter } from 'nodemailer';

export class EmailService {
  private transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.NODEMAILER_AUTH_USER || 'ezbooks9@gmail.com', // Your Gmail address
        pass: process.env.NODEMAILER_AUTH_PASS, // Your Gmail password or app password
      },
    });
  }

  // Method to send an email
  async sendEmail(
    to: string,
    subject: string,
    text: string,
    html?: string,
  ): Promise<void> {
    const mailOptions = {
      from: `EZ Books <${process.env.NODEMAILER_AUTH_USER}>`, // Sender address
      to,
      subject,
      text,
      html,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('Email sent:', info.response);
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
}
