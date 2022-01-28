const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = async (email, name) => {
  await sgMail.send({
    to: email,
    from: 'amjedyehia1998@gmail.com',
    subject: 'Thanks for joining in!',
    text: `Welcome to the App, ${name} let us know if you like the app`,
    html: '<h1>hello from me</h1>',
  });
  console.log('sent');
};

const sendDeletionEmail = async (email, name) => {
  await sgMail.send({
    to: email,
    from: 'amjedyehia1998@gmail.com',
    subject: 'we are very sad',
    text: `we sorry to see you leaving us, ${name} please let us know to make you happy again`,
  });
  console.log('sent');
};

module.exports = {
  sendWelcomeEmail,
  sendDeletionEmail,
};
