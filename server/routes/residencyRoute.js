import express from "express";
import { createResidency } from "../controllers/resdCntrl.js";
import { getAllResidencies } from "../controllers/resdCntrl.js";
import { getResidency } from "../controllers/resdCntrl.js";
const router = express.Router();

router.post("/create", createResidency)
router.get("/allresd", getAllResidencies)
router.get("/:id",getResidency)




export {router as residencyRoute}
