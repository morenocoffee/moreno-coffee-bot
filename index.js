const express = require("express");
const app = express();

app.use(express.json());

// VERIFY TOKEN — este es el que pones en Meta Developer
const VERIFY_TOKEN = "Moreno123";  

// 1) VERIFICACIÓN DEL WEBHOOK (META LLAMA AQUÍ CON GET)
app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode && token) {
    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      console.log("Webhook verified!");
      return res.status(200).send(challenge);
    } else {
      return res.sendStatus(403);
    }
  }
  return res.sendStatus(400);
});

// 2) RECEPCIÓN DE MENSAJES (POST)
app.post("/webhook", (req, res) => {
  console.log("Mensaje recibido:", JSON.stringify(req.body, null, 2));
  res.sendStatus(200);
});

// Puerto Render
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Bot running on port ${PORT}`));
