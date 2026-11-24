import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 4000;

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || /^http:\/\/localhost:\d+$/.test(origin)) {
        return callback(null, true);
      }
      return callback(new Error('Origine non autorisée'));
    },
  })
);
app.use(express.json({ limit: '10kb' }));

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'pro.turbo-smtp.com',
  port: Number(process.env.SMTP_PORT) || 587,
  secure: Number(process.env.SMTP_PORT) === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

app.post('/api/login-alert', async (req, res) => {
  const { email, device, loginTime } = req.body || {};

  if (!email || !device) {
    return res.status(400).json({ ok: false, error: 'Paramètres manquants' });
  }

  const formattedDate = loginTime
    ? new Date(loginTime).toLocaleString('fr-FR', { timeZone: 'Africa/Casablanca' })
    : new Date().toLocaleString('fr-FR', { timeZone: 'Africa/Casablanca' });

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.ALERT_TO,
      to: process.env.ALERT_TO || 'cortexoperation10@gmail.com',
      subject: 'Alerte Sécurité — Connexion Admin M&M-HUB',
      text: [
        'Bonjour,',
        '',
        'Une connexion réussie à l’espace Administration M&M-HUB vient d’être enregistrée :',
        `- Compte : ${email}`,
        `- Appareil / Navigateur : ${device}`,
        `- Date et heure : ${formattedDate}`,
      ].join('\n'),
    });

    return res.json({ ok: true });
  } catch (error) {
    console.error('Erreur envoi alerte SMTP:', error.message);
    return res.status(500).json({ ok: false, error: 'Échec envoi email' });
  }
});

app.listen(PORT, '127.0.0.1', () => {
  console.log(`Serveur d'alerte sécurisé actif sur http://127.0.0.1:${PORT}`);
});
