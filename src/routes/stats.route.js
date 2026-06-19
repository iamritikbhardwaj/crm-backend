import { Router } from "express";
import { getSummary } from "../controllers/stats.controller";

const router = Router();

router.get("/summary", getSummary)

export default router;