import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { queryPromise } from "../database/database.js";
dotenv.config();
const User = {};

User.signup = function (req, res) {
  console.debug("request signup received");
  if (!req.body) {
    res.status(400).json({ error: "No request body" });
    return;
  }

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
    res.status(400).json({ error: "Missing field" });
    return;
  }
  console.debug("querying sql");
  const sql = `SELECT COUNT(*) as found
                  FROM User
                  WHERE us_email = "${userEmail}"`;

  queryPromise(sql)
    .then((sqlres) => {
      //console.table(sqlres);
      if (sqlres[0]["found"]) {
        console.debug("Email already used");
        res.status(400).json({ code: "EMAIL_ALREADY_USED" });
        return;
      } else {
        // Good

        console.debug("registering new user");
        let sql = `INSERT INTO User ( \`us_firstname\`, \`us_lastname\`, \`us_age\`, \`us_email\`, \`us_password\`) 
                    VALUES ( '${userFirstName}', '${userLastName}', '${userAge}', '${userEmail}', '${userPassword}')`;

        queryPromise(sql)
          .then(() => {
            console.debug("Now login the new user");
            User.login(req, res);
            return;
          })
          .catch((reason) => {
            console.debug("Database error when subscribing", reason);
            res.status(500).json({ error: reason });
            return;
          });
      }
    })
    .catch((err) => {
      console.debug("database error", err);
      res.status(501).json({ error: "Can't subscribe" });
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

      if (userPassword != sqlres[0]["us_password"]) {
        res.status(401).json({ code: "INVALID_PASSWORD" });
        return;
      }

      res.status(200).json({
        token: jwt.sign(
          { userEmail: userEmail },
          process.env.PRIVATE_TOKEN_KEY
        ),
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err });
    });
};

export default User;
