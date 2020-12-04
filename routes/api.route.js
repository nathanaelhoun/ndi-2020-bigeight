import express from "express";

import { status, statsActivities } from "../controllers/api.js";

const apiRouter = express.Router();

apiRouter.get("/status", status);

apiRouter.get("/stats/activities", statsActivities);

export default apiRouter;
