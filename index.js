// Chargement des modules
const express = require("express");
const app = express();
const server = app.listen(12000, function () {
  // Ne pas modifier le numéro du port !
  console.log("C'est parti ! En attente de connexion sur le port 12000...");
  console.log("Se connecter à l'application en local : http://localhost:12000");
});

// Configuration d'express pour utiliser le répertoire "public"
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/public/index.html");
});
 