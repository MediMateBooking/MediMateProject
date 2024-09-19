const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    
    user: "zoomclasss63@gmail.com",
    pass: "ytqytxzezodjsvow",
  },
});

async function mainEmail(address,userIdURL) {
  

  const receiver = address || "chamoddousl@gmail.com"

  const info = await transporter.sendMail({
    from: 'MediMate E-Channeling Service', // sender address
    to: receiver, // list of receivers
    subject: "Welcome to MediMate", // Subject line
    text: userIdURL, // plain text body
    html: "<b>"+userIdURL+"</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);

}

// mainEmail().catch(console.error);

module.exports.mainEmail = mainEmail;


