import { Router } from "express";
import { topTenResults } from "../api-fetch/topResults.js";

const router = Router();

router.route("/api-results").get(topTenResults)

export default router