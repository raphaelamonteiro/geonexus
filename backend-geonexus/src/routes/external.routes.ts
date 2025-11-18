import { Router } from "express";
import { ExternalController } from "../controllers/external.controller";

const router = Router();

// REST Countries
router.get("/countries", ExternalController.getAllCountries);

// NewsData
router.get("/news/:country", ExternalController.getCountryNews);

export default router;
