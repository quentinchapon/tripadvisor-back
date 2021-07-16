const express = require("express");
const formidable = require("express-formidable");
const cors = require("cors");

const app = express();
app.use(formidable());
app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "Server started" });
});

app.post("/", (req, res) => {
  console.log(req.fields);

  const data = {
    from: "Excited User <me@samples.mailgun.org>",
    to: "votre-mail@gmail.com",
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

app.listen(3000, () => {
  console.log("Server started");
});

// -------
