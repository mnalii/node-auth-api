const nodemailer = require('nodemailer');

const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

module.exports = class Nodemailer {
  constructor(email) {
    this.to = email;
    this.from = `muh.nurali14493@gmail.com`;
  }

  newTransport() {
    return nodemailer.createTransport({
      port: process.env.EMAIL_PORT,
      host: process.env.EMAIL_HOST,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  // 1) Send the actual email with html template
  async send() {
    const html = `
      <p>Hello, ${this.to}</p>
      <br />
      <p>Thank you for signing up, please tell us how is it going to use our application 😁</p>
    `;

    // 2) Define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject: 'Signup Confirmation',
      html,
      text: 'Thank you for signing up my application 🥳',
    };

    // 3) Create a transport and send email
    await this.newTransport().sendMail(mailOptions);
  }
};
