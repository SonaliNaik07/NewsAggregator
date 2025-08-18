const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendEmail(to, articles) {
  const htmlContent = articles.map((a) => `
    <div style="margin-bottom: 20px;">
      <h3>${a.title}</h3>
      <p>${a.description || 'No description available.'}</p>
      <a href="${a.url}" target="_blank">Read full article</a>
      <hr/>
    </div>
  `).join('');

  await transporter.sendMail({
    from: `"NewsBot" <${process.env.EMAIL_USER}>`,
    to,
    subject: '📰 Your News Update',
    html: htmlContent,
  });
}

module.exports = sendEmail;
