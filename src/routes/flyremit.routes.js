import { Router } from "express";
import { callFlyRemit, mapFlyAgent } from "../controllers/agent.Controller";

const router = Router();

// ! flyremit
router.get("/mapAgent", mapFlyAgent)
router.post("/callFly", callFlyRemit)

export default router