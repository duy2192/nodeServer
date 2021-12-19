import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PWD,
  },
});
const sendMail = async (data,to,subject) => {


  const mainOptions = {
    from: '"da29.me" duyanh002192@gmail.com',
    to,
    subject: subject,
    html: data,
  };

  transporter.sendMail(mainOptions, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Message sent: " + info.response);
    }
  });
};
export default sendMail;
