const sgMail = require('@sendgrid/mail');
require("dotenv").config();
const { SENDGRID_API_KEY, SENDGRID_EMAIL } = process.env;
sgMail.setApiKey(SENDGRID_API_KEY);
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);


//-----------------------------------------------------------------------------

const sendVerificationEmailSendGrid = async (data) => {
    try {
        // const msg = {
        //     to: email,
        //     from: SENDGRID_EMAIL, //! Use the email address or domain you verified above
        //     subject: 'Thank you for registration with SendGrid!',
        //     text: '...and easy to do anywhere, even with Node.js and SendGrid',
        //     html: '<h1>...and easy to do anywhere, even with Node.js and SendGrid</h1>',
        // };
        const msg = { ...data, from: SENDGRID_EMAIL }
        const info = await sgMail.send(msg);
        console.log("");
        console.log("info:".bgCyan.black, info);
        console.log("");
        console.log("Email send using SendGrid success!".bgGreen.black);
        console.log("");
        return true;

    } catch (error) {
        throw error;
    }
};

module.exports = sendVerificationEmailSendGrid

