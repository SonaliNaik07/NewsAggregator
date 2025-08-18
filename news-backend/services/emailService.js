const transporter = require('../config/emailConfig');

function generateEmailHTML(articles) {
  return `
    <h2>Your News Update</h2>
    <ul>
      ${articles.map(a => `<li><a href="${a.url}">${a.title}</a></li>`).join('')}
    </ul>
  `;
}

async function sendEmail(to, articles) {
  const mailOptions = {
    from: `"NewsBot" <${process.env.EMAIL_USER}>`,
    to,
    subject: "📰 Your News Update",
    html: generateEmailHTML(articles)
  };

  await transporter.sendMail(mailOptions);
}

module.exports = { sendEmail };
