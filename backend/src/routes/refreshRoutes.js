// routes/refreshRoutes.js
import express from "express";
import refreshAccessToken from "../controllers/refreshController.js";

const router = express.Router();

router.get("/", refreshAccessToken);

export default router;
