import express from "express";
import Activity from "../controllers/activity.js";

const activityRouter = express.Router();

activityRouter.post("/add", Activity.add);

export default activityRouter;
