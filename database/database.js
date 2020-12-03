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

/**
 * Execute a query to database and return a Promise
 * @param sql The sql query
 * @return {Promise<Array>} The result if success, the error otherwise
 */
export async function queryPromise(sql) {
  return new Promise(function (resolve, reject) {
    Database.connection.query(sql, function (err, res) {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });
}

export default Database;
