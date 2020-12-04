import { queryPromise } from "../database/database.js";

export async function status(req, res) {
  let response = {
    status: "online",
    fun: "yes",
  };

  res.status(200).json(response);
}

export async function statsActivities(req, res) {
  queryPromise(`
  SELECT * 
  FROM User NATURAL JOIN Activity NATURAL JOIN UsedProduct NATURAL JOIN Product
`).then((sqlRes) => {
    console.table(sqlRes);
    res.status(200).json(sqlRes);
  });
}
