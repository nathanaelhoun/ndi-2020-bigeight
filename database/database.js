import mysql from "mysql";
import dotenv from "dotenv";

dotenv.config();

const Database = {};

Database.connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  multipleStatements: true,
});

Database.connect = function (err) {
  if (err) {
    console.error("Can't connect to the database.");
    throw err;
  }

  console.log("Database connected !");
};

export default Database;
