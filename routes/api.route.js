import express from "express";

import { status } from "../controllers/api.js";


const apiRouter = express.Router();

apiRouter.get("/status", status);

export default apiRouter;
