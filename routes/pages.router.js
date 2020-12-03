import express from "express";
import path from "path";

const __dirname = path.resolve();
let pagesRouter = express.Router();

servePage("/", "index");
servePage("/connexion", "login");
servePage("/inscription", "signup");
servePage("/utilisateur", "user");
servePage("/donnees", "data");
servePage("/activite", "activity");
servePage("/amongus", "amongus");
servePage("*", "404"); // default

// Functions
/**
 * Serve the html file following the url
 * @param {string} url
 * @param {string} filename
 */
function servePage(url, filename) {
  pagesRouter.get(url, function (_, res) {
    res.sendFile(__dirname + `/public/html/${filename}.html`);
  });
}

export default pagesRouter;
