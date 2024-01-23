import express from "express";
import {
  createProfileHandler,
  getAllProfilesHandler,
  getProfileHandler,
} from "../controllers/profile.controller.js";

const router = express.Router();

router.post("/", createProfileHandler);
router.get("/", getAllProfilesHandler);
router.get("/:id", getProfileHandler);

export default router;
