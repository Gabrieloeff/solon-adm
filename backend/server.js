// backend/server.js
import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); // permite requisições de outros domínios
app.use(express.json()); // para ler JSON

app.post('/send', (req, res) => {
  const { nome, email, mensagem } = req.body;

  if (!nome || !email || !mensagem) {
    return res.status(400).json({ success: false, message: 'Todos os campos são obrigatórios.' });
  }

  // Aqui você pode enviar e-mail, salvar em banco etc.
  console.log('Recebido:', { nome, email, mensagem });

  return res.status(200).json({ success: true });
});

app.listen(PORT, () => {
  console.log(`✅ Servidor rodando na porta ${PORT}`);
});
