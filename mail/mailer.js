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

async function mainEmail(address,userIdURL) {
  

  const receiver = address || "chamoddousl@gmail.com";

  const info = await transporter.sendMail({
    from: "MediMate E-Channeling Service",
    to: receiver, 
    subject: "Welcome to MediMate",
    text: `Please Activate your profile by visiting the following link: ${userIdURL}`,
    html: `
      <div style="max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 10px; padding: 20px; font-family: Arial, sans-serif; text-align: center;">
        <div style="margin-bottom: 20px;">
          <img src="/assets/img/logo.png" alt="MediMate Logo" style="max-width: 150px;">
        </div>
        <h2 style="color: #4CAF50;">Activate Your Profile</h2>
        <p style="font-size: 16px; color: #333;">Thank you for signing up with MediMate. Please click the button below to activate your profile:</p>
        <a href="${userIdURL}" style="display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px; font-size: 18px; margin-top: 20px;">
          Activate Profile
        </a>
        <p style="font-size: 12px; color: #999; margin-top: 30px;">If the button above does not work, copy and paste the following link into your browser: <br> ${userIdURL}</p>
      </div>
    `,
  });

    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.log("Error sending email:", error);
  }

}

// mainEmail().catch(console.error);

module.exports.mainEmail = mainEmail;


