const express = require("express");
const app = express();

// Twilio using ENV variables
const client = require("twilio")(
  process.env.TWILIO_SID,
  process.env.TWILIO_AUTH
);

app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Server running 🚀");
});

// Alert route
app.post("/alert", async (req, res) => {
  const status = req.body.status;

  if (status === "NO_SEATBELT") {
    try {
      await client.messages.create({
        body: "⚠️ Alert: Seatbelt not worn!",
        from: process.env.TWILIO_PHONE,
        to: process.env.MY_PHONE
      });

      console.log("SMS sent!");
      res.send("Alert sent");
    } catch (err) {
      console.log("Error:", err);
      res.status(500).send("Error sending SMS");
    }
  } else {
    res.send("No issue");
  }
});

// IMPORTANT for Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});