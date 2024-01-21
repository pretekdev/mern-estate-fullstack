import express from "express";
import { createResidency } from "../controllers/resdCntrl.js";
import { getAllResidencies } from "../controllers/resdCntrl.js";
import { getResidency } from "../controllers/resdCntrl.js";
const router = express.Router();
import jwtCheck from "../config/auth0Config.js";

router.post("/create", jwtCheck, createResidency)
router.get("/allresd", getAllResidencies)
router.get("/:id",getResidency)




export {router as residencyRoute}
