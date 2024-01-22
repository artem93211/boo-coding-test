import express from "express";
import {
  createProfileHandler,
  getAllProfilesHandler,
  getProfileHandler,
} from "../controllers/profile.controller.js";

const router = express.Router();

router.post("/profile", createProfileHandler);
router.get("/profiles", getAllProfilesHandler);
router.get("/profile/:id", getProfileHandler);

export default router;
