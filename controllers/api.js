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
  (
    (
      SELECT us_firstname, COUNT(ac_id) AS nbProduits, pr_name
      FROM User NATURAL LEFT OUTER JOIN (Activity NATURAL INNER JOIN UsedProduct NATURAL INNER JOIN Product)
      GROUP BY us_firstname, pr_name
    ) 
    UNION 
    (
      SELECT us_firstname, 0 as nbProduits, pr_name
      FROM (User NATURAL INNER JOIN Activity NATURAL INNER JOIN UsedProduct) NATURAL RIGHT OUTER JOIN Product
      GROUP BY us_firstname, pr_name
    )
  )
`).then((sqlRes) => {
    
    console.table(sqlRes);
    res.status(200).json(sqlRes);
  });
}
