// const nodemailer = require('nodemailer');
//
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'ansconnect2020@gmail.com',
//     pass: process.env.EMAIL_PASS
//   }
// });
//
// const testOptions = {
//   from: 'ansconnect2020@gmail.com',
//   to: 'nickhealy33@gmail.com',
//   subject: 'Confirm your email',
//   text: 'confirmation code: 12345'
// }
//
// transporter.sendMail(testOptions, (error, info) => {
//   if (error) {
//     console.error(error);
//   } else {
//     console.log('Email sent: ' + info.response);
//   }
// })
//
// const sendEmail = (recipient, subject, text) => {
//
// }
