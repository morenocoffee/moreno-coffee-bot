const express = require("express");
const app = express();
app.use(express.json());

// =======================
// VERIFY TOKEN (debes usar el mismo que pones en Meta)
// =======================
const VERIFY_TOKEN = process.env.Moreno_Coffee;

// =======================
// GET - VERIFICACIÓN DEL WEBHOOK PARA META
// =======================
app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode && token) {
    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      console.log("WEBHOOK VERIFIED ✔");
      res.status(200).send(challenge);
    } else {
      console.log("❌ VERIFY TOKEN INCORRECTO");
      res.sendStatus(403);
    }
  }
});

// =======================
// POST - MENSAJES (LO AGREGAMOS LUEGO)
// =======================
app.post("/webhook", (req, res) => {
  console.log("Mensaje recibido:", JSON.stringify(req.body, null, 2));
  res.sendStatus(200);
});

// =======================
// INICIO DEL SERVIDOR
// =======================
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Bot corriendo en el puerto ${PORT}`);
});
