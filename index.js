const express = require("express");
const formidable = require("express-formidable");
const cors = require("cors");

const API_KEY = "API_MAILGUN";
const DOMAIN = "DOMAIN_MAILGUN";
const mailgun = require("mailgun-js")({ apiKey: API_KEY, domain: DOMAIN });

require("dotenv").config();

const app = express();
app.use(formidable());
app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "Server started" });
});

app.post("https://tripadvisclone.netlify.app", (req, res) => {
  console.log(req.fields);

  const data = {
    from: "q.chapon@gmail.com",
    to: req.fields.email,
    subject: "Formulaire",
    text: req.fields.message,
  };

  mailgun.messages().send(data, (error, body) => {
    console.log(body);
    console.log(error);

    if (error !== undefined) {
      res.json({ message: "Données reçues, mail envoyé" });
    } else {
      res.json({ error: "An error occurred" });
    }
  });
});

app.all("*", function (req, res) {
  console.log("Tribadibadou");
});

app.listen(process.env.PORT, () => {
  console.log("Server started");
});

// -------
