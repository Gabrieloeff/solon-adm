console.log('Rota /send carregada');

const express = require('express');
const router = express.Router();
const sendMail = require('./mailer');

router.post('/', async (req, res) => {
  const { nome, email, mensagem } = req.body;

  if (!nome || !email || !mensagem) {
    return res.status(400).json({ success: false, message: 'Todos os campos são obrigatórios.' });
  }

  try {
    await sendMail(nome, email, mensagem);
    res.status(200).json({ success: true, message: 'Email enviado com sucesso!' });
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao enviar e-mail',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

module.exports = router;
