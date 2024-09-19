const nodemailer = require("nodemailer");
const path = require('path');

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.USER,
    pass: process.env.APP_PASSWORD,
  },
});

async function mainEmail(address, userIdURL) {

  const receiver = address || "chamoddousl@gmail.com"

  try {
    const info = await transporter.sendMail({
      from: 'MediMate E-Channeling Service', // sender address
      to: receiver, // list of receivers
      subject: "Welcome to the MediMate Appointment", // Subject line
      text: userIdURL, // plain text body
      html: "<b>" + userIdURL + "</b>", // html body
      attachments: [
        {
          filename: 'MediMate.png',
          path: path.join(__dirname, 'favicon.png'),
          contentType: 'image/png'
        }
      ]
    });

    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.log("Error sending email:", error);
  }

}

// mainEmail().catch(console.error);

module.exports.mainEmail = mainEmail;


