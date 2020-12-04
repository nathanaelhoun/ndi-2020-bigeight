// Chargement des modules
import express from "express";
import pageRouter from "./routes/pages.router.js";
import db from "./database/database.js";
import cors from "cors";
import userRouter from "./routes/user.router.js";
import bodyParser from "body-parser";
import apiRouter from "./routes/api.route.js";

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Configuration d'express pour utiliser le répertoire "public"
app.use(express.static("public"));

app.use("/user", userRouter);
app.use("/api/v1", apiRouter);
app.use("/", pageRouter);

app.listen(12000, function () {
  // Ne pas modifier le numéro du port !
  console.log("C'est parti ! En attente de connexion sur le port 12000...");
  console.log("Se connecter à l'application en local : http://localhost:12000");
});

db.connection.connect(db.connect);
