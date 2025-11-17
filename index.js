const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Moreno Coffee Bot is running!");
});

// VERIFY WEBHOOK
app.get("/webhook", (req, res) => {
  const verify_token = process.env.VERIFY_TOKEN;

  if (req.query["hub.verify_token"] === verify_token) {
    return res.send(req.query["hub.challenge"]);
  }
  return res.status(403).send("Verification failed");
});

// HANDLE IG MESSAGES
app.post("/webhook", (req, res) => {
  console.log("Webhook event received:", JSON.stringify(req.body, null, 2));
  return res.sendStatus(200);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Bot running on port " + PORT));
