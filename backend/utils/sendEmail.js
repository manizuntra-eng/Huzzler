// import send from '@sendgrid/mail';
// import setApiKey from '@sendgrid/mail';

// setApiKey(process.env.SENDGRID_API_KEY);

// const sendOTPEmail = async (to, code) => {
//   const msg = {
//     to,
//     from: process.env.FROM_EMAIL,
//     subject: 'Your Zuntraa OTP',
//     text: `Your Zuntraa verification code is: ${code}`,
//     html: `<p>Your Zuntraa verification code is: <strong>${code}</strong></p>`
//   };
//   await send(msg);
// }

// export default sendOTPEmail;

import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendOTPEmail = async (to, code) => {
  const msg = {
    to,
    from: process.env.FROM_EMAIL, // must be a verified sender in SendGrid
    subject: "Your Zuntraa OTP",
    text: `Your Zuntraa verification code is: ${code}`,
    html: `<p>Your Zuntraa verification code is: <strong>${code}</strong></p>`,
  };

  try {
    await sgMail.send(msg);
    console.log(`✅ OTP email sent to ${to}`);
  } catch (error) {
    console.error("❌ Error sending OTP email:", error);

    // Helpful details from SendGrid
    if (error.response) {
      console.error(error.response.body);
    }

    throw new Error("Failed to send OTP email");
  }
};

export default sendOTPEmail;
