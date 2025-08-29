const nodemailer = require('nodemailer');

async function sendMail(nome, email, mensagem) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: `"Formulário do site" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_TO,
    replyTo: email,
    subject: 'Nova mensagem do formulário',
    text: `Nome: ${nome}\nEmail: ${email}\nMensagem: ${mensagem}`
  };

  return transporter.sendMail(mailOptions);
}

module.exports = sendMail;
