const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function sendOTPEmail(to, code) {
  const msg = {
    to,
    from: process.env.FROM_EMAIL,
    subject: 'Your Zuntraa OTP',
    text: `Your Zuntraa verification code is: ${code}`,
    html: `<p>Your Zuntraa verification code is: <strong>${code}</strong></p>`
  };
  await sgMail.send(msg);
}

module.exports = { sendOTPEmail };
