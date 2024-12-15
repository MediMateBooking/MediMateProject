const nodemailer = require("nodemailer");
const path = require("path");

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
  try {

    const receiver = address || "chamoddousl@gmail.com";

    const info = await transporter.sendMail({
      from: "MediMate E-Channeling Service",
      to: receiver,
      subject: "Welcome to MediMate",
      text: `Please Activate your profile by visiting the following link: ${userIdURL}`,
      html: `
      <div style="max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 10px; padding: 20px; font-family: Arial, sans-serif; text-align: center;">
        <div style="margin-bottom: 20px;">

          <img src="https://i.imghippo.com/files/2eqG21727755629.png" alt="MediMate Logo" style="max-width: 150px;">

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
  } catch (e) {
    throw new Error("Error sending email");
  }
}

async function mainEmailValidation(address, userIdURL) {
  try {

    const receiver = address || "chamoddousl@gmail.com";

    const info = await transporter.sendMail({
      from: "MediMate E-Channeling Service",
      to: receiver,
      subject: "Welcome to MediMate",
      text: `Please Activate Email Address visiting the following link: ${userIdURL}`,
      html: `
      <div style="max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 10px; padding: 20px; font-family: Arial, sans-serif; text-align: center;">
        <div style="margin-bottom: 20px;">

          <img src="https://i.imghippo.com/files/2eqG21727755629.png" alt="MediMate Logo" style="max-width: 150px;">

        </div>
        <h2 style="color: #4CAF50;">Validate Your Email</h2>
        <p style="font-size: 16px; color: #333;">Thank you for signing up with MediMate. Please click the button below to validate your email address:</p>
        <a href="${userIdURL}" style="display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px; font-size: 18px; margin-top: 20px;">
          Validate Email
        </a>
        <p style="font-size: 12px; color: #999; margin-top: 30px;">If the button above does not work, copy and paste the following link into your browser: <br> ${userIdURL}</p>
      </div>
    `,
    });
    console.log("Message sent: %s", info.messageId);
  } catch (e) {
    throw new Error("Error sending email");
  }
}


async function doctorAccoutApprove(doctorEmail, doctorName, doctorPassword ) {
  try {

    const receiver = doctorEmail || "chamoddousl@gmail.com";

    const info = await transporter.sendMail({
      from: "MediMate E-Channeling Service",
      to: receiver,
      subject: "Account Approved Successfully!",
      text: `Your Account has been Approved by Admin`,
      html: `
      <div style="max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 10px; padding: 20px; font-family: Arial, sans-serif; text-align: left;">
        <div style="margin-bottom: 20px;">

          <img src="https://i.imghippo.com/files/nsLQ8894uIY.png" alt="approveSuccessfull" style="max-width: 60px;">

        </div>
        <h2 style="color:rgb(38, 212, 228);">Congratulations Dr.${doctorName}</h2>
        <p style="font-size: 16px; color: #333;"><b>Your Account has been Approved by MediMate Admin</b></p>
        <p style="font-size: 15px; color: #333;">Please use below credentials for Login</p>
        <p style="font-size: 14px; color: #333;">Username : ${doctorEmail}</p>
        <p style="font-size: 14px; color: #333;">Password : ${doctorPassword}</p>
        
        <p style="font-size: 12px; color: #999; margin-top: 30px;">When your first Login Change the Login Password</p>
      </div>
    `,
    });
    console.log("Message sent: %s", info.messageId);
  } catch (e) {
    throw new Error("Error sending email");
  }
}


async function doctorAccoutReject(doctorEmail) {
  try {

    const receiver = doctorEmail || "chamoddousl@gmail.com";

    const info = await transporter.sendMail({
      from: "MediMate E-Channeling Service",
      to: receiver,
      subject: "Your Medimate User Account has been Rejected by Admin",
      text: `Your Account has been Approved by Admin`,
      html: `
      <div style="max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 10px; padding: 20px; font-family: Arial, sans-serif; text-align: left;">
        <div style="margin-bottom: 20px;">

          <img src="https://i.imghippo.com/files/hai1821sgo.jpg" alt="accountRejected" style="max-width: 60px;">

        </div>
        <h2 style="color:rgb(228, 38, 54);">We all have Bad Days</h2>
        <p style="font-size: 16px; color: #333;"><b>Your Medimate User Account has been Rejected by Admin</b></p>
        <p style="font-size: 15px; color: #333;">This is usually happen when your information cannot verify by Admin</p>
        <p style="font-size: 14px; color: #333;">If you have any concern about this Please contact Medimate Admin</p>
     
        <p style="font-size: 12px; color: #999; margin-top: 30px;">Admin@gmail.com</p>
      </div>
    `,
    });
    console.log("Message sent: %s", info.messageId);
  } catch (e) {
    throw new Error("Error sending email");
  }
}

module.exports.emailFuntion = {
  mainEmail: mainEmail,
  mainEmailValidation: mainEmailValidation,
  doctorAccoutApprove : doctorAccoutApprove,
  doctorAccoutReject : doctorAccoutReject
  
};
