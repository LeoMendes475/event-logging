import axios from "axios";
import fs from "fs/promises"; // Para manipular arquivos de forma assíncrona
// import nodemailer from "nodemailer";

const SITE_URL = "https://exemplo.com"; // URL do site a ser monitorado
const INTERVAL = 30 * 1000; // Tempo entre verificações (30 segundos)

// Configuração do envio de email (Gmail como exemplo)
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: "seuemail@gmail.com",
//     pass: "suasenha",
//   },
// });

// Função para verificar o status do site
async function checkWebsite() {
  try {
    const response = await axios.get(SITE_URL);
    
    if (response.status === 200) {
      console.log(`[✔] ${SITE_URL} está online!`);
    } else {
      throw new Error(`Status Code: ${response.status}`);
    }
  } catch (error) {
    console.error(`[✖] ${SITE_URL} caiu! Erro: ${error.message}`);

    // Salvar log no arquivo
    await fs.appendFile("logs.txt", `${new Date().toISOString()} - ERRO: ${error.message}\n`);

    // Enviar e-mail de alerta
    // await sendAlertEmail(error.message);
  }
}

// Função para enviar alerta por e-mail
// async function sendAlertEmail(errorMsg) {
//   const mailOptions = {
//     from: "seuemail@gmail.com",
//     to: "destinatario@email.com",
//     subject: `⚠️ Alerta: ${SITE_URL} está fora do ar!`,
//     text: `O site ${SITE_URL} caiu em ${new Date().toISOString()}.\nErro: ${errorMsg}`,
//   };

//   await transporter.sendMail(mailOptions);
//   console.log("Email de alerta enviado!");
// }

// Rodar o monitoramento a cada INTERVAL segundos
setInterval(checkWebsite, INTERVAL);
