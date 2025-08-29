// functions/index.js
import { onRequest } from "firebase-functions/v2/https";
import { setGlobalOptions } from "firebase-functions/v2";
import { defineSecret } from "firebase-functions/params";
import express from "express";
import cors from "cors";

// região padrão para todas as funções
setGlobalOptions({ region: "southamerica-east1" });

// secret do token de e-mail (definido via CLI)
const EMAIL_TOKEN = defineSecret("EMAIL_TOKEN");

const app = express();

// 🔒 CORS configurado apenas para seus domínios do Hosting
const corsOptions = {
  origin: [
    "https://site-solon.web.app",
    "https://site-solon.firebaseapp.com"
  ],
  methods: ["POST", "OPTIONS"],
  allowedHeaders: ["Content-Type"],
};

const corsMw = cors(corsOptions);

app.use(express.json());

// ✅ responde preflight (OPTIONS) explicitamente nas rotas usadas
app.options(["/send", "/api/send"], corsMw);

// ✅ rota principal com CORS aplicado
app.post(["/send", "/api/send"], corsMw, async (req, res) => {
  try {
    const token = EMAIL_TOKEN.value();
    // TODO: usar `token` no seu serviço de e-mail (SMTP/API externa)
    // ex.: await emailClient({ token }).send(req.body);

    res.status(200).json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: "internal_error" });
  }
});

// a Function 'api' atende /api/** (se você fizer rewrite no Hosting)
export const api = onRequest({ secrets: [EMAIL_TOKEN] }, app);
