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
    SELECT us_firstname, us_lastname
    FROM User
  `).then((sqlResUsers) => {
    queryPromise(`
      SELECT  pr_name
      FROM  Product
    `).then((sqlResProduits) => {
      queryPromise(`
        SELECT us_firstname, us_lastname, pr_name, COUNT(ac_id) as nbProduit
        FROM User NATURAL JOIN Activity NATURAL JOIN UsedProduct NATURAL JOIN Product
        GROUP BY us_firstname, us_lastname, pr_name
      `).then((sqlResJointure) => {
        const data = new Map();

        sqlResUsers.forEach((user) => {
          sqlResProduits.forEach((prod) => {
            const username = user.us_firstname + " " + user.us_lastname;
            const productName = prod.pr_name;
            data.set({ username, productName }, 0);
          });
        });

        sqlResJointure.forEach((element) => {
          const username = element.us_firstname + " " + element.us_lastname;
          const productName = element.pr_name;
          data.set({ username, productName }, element.nbProduit);
        });

        const result = {
          records: [],
        }

        data.forEach((v, k) => {
          result.records.push(
            {
              Utilisateur: k.username,
              Produit: k.productName,
              Quantite: v,
            }
          );
        })

        res.status(200).json(result);
      });
    });
  });
}
