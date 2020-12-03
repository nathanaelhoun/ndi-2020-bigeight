import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { queryPromise } from "../database/database.js";
dotenv.config();
const User = {};

User.signup = function (req, res, next) {
  if (!req.body) {
    res.status(400).json({ error: "No request body" });
    return;
  }
  for (let i in req.body) {
    req.body[i] = req.body[i].trim();
  }
  const {
    userFirstName,
    userLastName,
    userAge,
    userEmail,
    userPassword,
    userPasswordConf,
  } = req.body;

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
    res.status(400).json({ error: "Missing field" });
    return;
  }

  const sql = `SELECT COUNT(*) as found
                  FROM User
                  WHERE us_email = "${userEmail}"`;

  queryPromise(sql)
    .then((sqlres) => {
      console.table(sqlres);
      if (sqlres[0]["found"]) {
        res.status(400).json({ code: "EMAIL_ALREADY_USED" });
        return;
      } else {
        // Good

        bcrypt.hash(userPassword, 10).then((hash) => {
          let sql = `INSERT INTO user ( \`us_firstname\`, \`us_lastname\`, \`us_age\`, \`us_email\`, \`us_password\`) 
                    VALUES ( '${userFirstName}', '${userLastName}', '${userAge}', '${userEmail}', '${hash}')`;

          queryPromise(sql)
            .then(() => {
              console.log("ok");
              res.status(200).json({ ok: 1 });
              return;
            })
            .catch((reason) => {
              res.status(500).json({ error: reason });
              return;
            });
        });
      }
    })
    .catch(() => {
      res.status(501).json({ error: "Can't login" });
      return;
    });
};

User.login = function (req, res) {
  if (!req.body) {
    res.status(400).json({ error: "No request body" });
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
        res.status(401).json({ code: "USER_NOT_FOUND" });
        return;
      }

      bcrypt.compare(userPassword, pass).then((isValid) => {
        if (!isValid) {
          res.status(401).json({ code: "INVALID_PASSWORD" });
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
    .catch();
};

export default User;
