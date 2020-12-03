import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { queryPromise } from "../database/database.js";
dotenv.config();
const User = {};

User.signup = function (req, res) {
  if (!req.body) {
    res.status(400).json({ error: "No request body" });
    return;
  }
  for (let i in req.body) {
    req.body[i] = req.body[i].trim();
  }
  console.table(req.body);

  let userFirstName = req.body.userFirstName.trim();
  let userLastName = req.body.userLastName.trim();
  let userAge = req.body.userAge.trim();
  let userEmail = req.body.userEmail.trim();
  let userPassword = req.body.userPassword.trim();
  let userPasswordConf = req.body.userPasswordConf.trim();

  if (
    !(
      userAge &&
      userEmail &&
      userFirstName &&
      userLastName &&
      userPassword &&
      userPasswordConf
    )
  ) {
    res.status(400).json({ error: "Tous les champs doivent être complétés" });
    return;
  }

  if (userPassword !== userPasswordConf) {
    res
      .status(400)
      .json({ error: "Les mots de passes doivent être identique" });
    return;
  }

  const sql = `SELECT COUNT(*) as found
                  FROM User
                  WHERE us_email = "${userEmail}"`;

  queryPromise(sql)
    .then((sqlres) => {
      //console.table(sqlres);
      if (sqlres[0]["found"]) {
        res.status(400).json({ error: "L'email est déjà utilisé" });
        return;
      } else {
        // Good

        bcrypt.hash(userPassword, 10).then((hash) => {
          let sql = `INSERT INTO user ( \`us_firstname\`, \`us_lastname\`, \`us_age\`, \`us_email\`, \`us_password\`) 
                    VALUES ( '${userFirstName}', '${userLastName}', '${userAge}', '${userEmail}', '${hash}')`;

          queryPromise(sql)
            .then(() => {
              console.log("login");
              User.login(req, res);
              return;
            })
            .catch((reason) => {
              res.status(500).json({ error: reason });
              return;
            });
        });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err });
      return;
    });
};

User.login = function (req, res) {
  if (!req.body) {
    res.status(400).json({ error: "Tous les champs doivent être" });
    return;
  }
  for (let i in req.body) {
    req.body[i] = req.body[i].trim();
  }

  const { userEmail, userPassword } = req.body;

  const sql = `SELECT us_password 
                FROM User
                WHERE us_email = '${userEmail}'`;

  queryPromise(sql)
    .then((sqlres) => {
      if (!sqlres || !sqlres[0] || !sqlres[0]["us_password"]) {
        res.status(401).json({ error: "Utilisateur inconnu" });
        return;
      }

      bcrypt.compare(userPassword, sqlres[0]["us_password"]).then((isValid) => {
        if (!isValid) {
          res.status(401).json({ error: "Le mot de passe est incorrecte" });
          return;
        }
        res.status(200).json({
          token: jwt.sign(
            { userEmail: userEmail },
            process.env.PRIVATE_TOKEN_KEY
          ),
        });
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};

export default User;
