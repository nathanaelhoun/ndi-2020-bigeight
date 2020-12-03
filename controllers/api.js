// import db from "../database/database.js";

export async function status(req, res) {
  let response = {
    status: "online",
    fun: "yes",
  };

  res.status(200).json(response);
}
