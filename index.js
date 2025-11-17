const express = require("express");
const bodyParser = require("body-parser");
const app = express();

// Leer variables de entorno desde Render
require("dotenv").config();

app.use(bodyParser.json());

// PORT
const PORT = process.env.PORT || 10000;

// GET Webhook (verificación)
app.get("/webhook", (req, res) => {
    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    console.log("Verify request received:", req.query);

    if (mode && token) {
        if (mode === "subscribe" && token === process.env.VERIFY_TOKEN) {
            console.log("Webhook verified successfully!");
            return res.status(200).send(challenge);
        } else {
            console.log("VERIFY TOKEN DOES NOT MATCH.");
            return res.sendStatus(403);
        }
    }

    res.sendStatus(400);
});

// POST Webhook (mensajes)
app.post("/webhook", (req, res) => {
    console.log("Webhook event received:", req.body);
    res.sendStatus(200);
});

app.listen(PORT, () => {
    console.log(`Bot running on port ${PORT}`);
});
