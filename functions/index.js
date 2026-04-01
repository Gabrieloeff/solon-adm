// functions/index.js
import { onRequest } from "firebase-functions/v2/https";
import { setGlobalOptions } from "firebase-functions/v2";
import { defineSecret } from "firebase-functions/params";
import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";

// região padrão para todas as funções
setGlobalOptions({ region: "southamerica-east1" });

// secrets para configuração de email
const EMAIL_USER = defineSecret("EMAIL_USER");
const EMAIL_PASS = defineSecret("EMAIL_PASS");
const EMAIL_TO = defineSecret("EMAIL_TO");

const app = express();

// 🔒 CORS configurado apenas para seus domínios do Hosting
const corsOptions = {
  origin: [
    "https://site-solon.web.app",
    "https://site-solon.firebaseapp.com",
    "https://solon-adm.com",
    "https://www.solon-adm.com"
  ],
  methods: ["POST", "OPTIONS"],
  allowedHeaders: ["Content-Type"],
};

const corsMw = cors(corsOptions);

app.use(express.json());

// ✅ responde preflight (OPTIONS) explicitamente nas rotas usadas
app.options(["/send", "/api/send"], corsMw);

// Função para enviar email
async function sendMail(nome, email, mensagem, emailUser, emailPass, emailTo) {
  const transporter = nodemailer.createTransporter({
    service: 'gmail',
    auth: {
      user: emailUser,
      pass: emailPass
    }
  });

  const mailOptions = {
    from: `"Formulário do site" <${emailUser}>`,
    to: emailTo,
    replyTo: email,
    subject: 'Nova mensagem do formulário - Solon',
    html: `
      <h2>Nova mensagem do formulário de contato</h2>
      <p><strong>Nome:</strong> ${nome}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Mensagem:</strong></p>
      <p>${mensagem}</p>
    `,
    text: `Nome: ${nome}\nEmail: ${email}\nMensagem: ${mensagem}`
  };

  return transporter.sendMail(mailOptions);
}

// ✅ rota principal com CORS aplicado
app.post(["/send", "/api/send"], corsMw, async (req, res) => {
  try {
    const { nome, email, mensagem } = req.body;

    // Validação dos campos obrigatórios
    if (!nome || !email || !mensagem) {
      return res.status(400).json({ 
        ok: false, 
        error: "Todos os campos são obrigatórios" 
      });
    }

    // Validação básica de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        ok: false, 
        error: "Email inválido" 
      });
    }

    // Obter secrets
    const emailUser = EMAIL_USER.value();
    const emailPass = EMAIL_PASS.value();
    const emailTo = EMAIL_TO.value();

    // Enviar email
    await sendMail(nome, email, mensagem, emailUser, emailPass, emailTo);

    console.log(`Email enviado com sucesso para ${emailTo} de ${nome} (${email})`);
    
    res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Erro ao enviar email:", err);
    res.status(500).json({ ok: false, error: "internal_error" });
  }
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

// a Function 'api' atende /api/** (se você fizer rewrite no Hosting)
export const api = onRequest({ 
  secrets: [EMAIL_USER, EMAIL_PASS, EMAIL_TO] 
}, app);