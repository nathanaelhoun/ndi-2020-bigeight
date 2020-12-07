// Chargement des modules
import express from "express";
import db from "./database/database.js";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import userRouter from "./routes/user.router.js";
import apiRouter from "./routes/api.route.js";
import activityRouter from "./routes/activity.router.js";
import pageRouter from "./routes/pages.router.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Configuration d'express pour utiliser le répertoire "public"
app.use(express.static("public"));

app.use("/activity", activityRouter);
app.use("/user", userRouter);
app.use("/api/v1", apiRouter);
app.use("/", pageRouter);

const PORT = process.env.PORT || 12000;
app.listen(PORT, function () {
  // Ne pas modifier le numéro du port !
  console.info(`C'est parti ! En attente de connexion sur le port ${PORT}...`);
  console.info(
    `Se connecter à l'application en local : http://localhost:${PORT}`
  );
});

db.connection.connect(db.connect);
