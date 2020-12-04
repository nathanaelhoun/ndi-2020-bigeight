import { queryPromise } from "../database/database.js";

const Activity = {};

Activity.add = async function (req, res) {
  if (!req.body) {
    res.status(400).json({ error: "No request body" });
    return;
  }

  const dateBegin = req.body.dateBegin.trim();
  const dateEnd = req.body.dateEnd.trim();
  const userEmail = req.body.userEmail.trim();
  const spotName = req.body.spotName.trim();
  const spotAdress = req.body.spotAdress.trim();
  const nbSailBoat = req.body.nbSailBoat.trim();
  const nbPleasureBoat = req.body.nbPleasureBoat.trim();
  const nbFishingBoat = req.body.nbFishingBoat.trim();
  const nbBathers = req.body.nbBathers.trim();
  const products = req.body.products.map((e) => e.trim());

  let spotid;

  let sql = `SELECT sp_id FROM Spot WHERE sp_name = "${spotName}"`;
  await queryPromise(sql).then(async (resSql) => {
    console.table(resSql);
    if (!resSql[0]) {
      let sql = `INSERT INTO \`Spot\` (\`sp_name\`,\`sp_address\`) VALUES ("${spotName}","${spotAdress}");
                  SELECT sp_id FROM Spot WHERE sp_name = "${spotName}"`;
      await queryPromise(sql)
        .then((resSql) => {
          console.table(resSql);
          spotid = resSql[1][0]["sp_id"];
        })
        .catch(console.log);
    } else {
      spotid = resSql[0]["sp_id"];
    }
    console.log("spotid" + spotid);

    sql = `INSERT INTO \`activity\` (\`ac_id\`, \`sp_id\`, \`us_email\`, \`ac_startDate\`, \`ac_endDate\`, \`ac_nbBathers\`, \`ac_nbFishingBoat\`, \`ac_nbPleasureBoat\`, \`ac_nbSailBoat\`) VALUES (NULL, '${spotid}', '${userEmail}', '${dateBegin}', '${dateEnd}', '${nbBathers}', '${nbFishingBoat}', '${nbPleasureBoat}', '${nbSailBoat}'); SELECT MAX(ac_id) as id FROM Activity;`;

    let actId;
    await queryPromise(sql)
      .then((resSql) => {
        actId = resSql[1][0]["id"];
      })
      .catch(console.log);

    for (let product of products) {
      let productExists = `SELECT COUNT(*) as yes
													FROM Product
													WHERE pr_name = "${product}"`;
      await queryPromise(productExists)
        .then((resSql) => {
          if (!resSql[0]["yes"]) {
            let sql = `INSERT INTO \`Product\` (\`pr_id\`, \`pr_name\`) VALUES (NULL, '${product}');
                    SET @id = (SELECT pr_id FROM Product WHERE pr_name = "${product}");
                    INSERT INTO \`UsedProduct\` (\`ac_id\`,\`pr_id\`) VALUES (${actId},@id);
                    `;
            queryPromise(sql).then().catch(console.log);
          }
        })
        .catch(console.log);
    }
    res.status(200).json({ ok: "ok" });
  });
};

export default Activity;
