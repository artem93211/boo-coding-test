import express from "express";
import {
    createUserHandler,
    getAllUsersHandler,
    getUserByIdHandler,
} from "../controllers/user.controller.js";
import {
    createCommentForUserHandler,
    getAllCommentsForUserHandler,
} from "../controllers/comment.controller.js";

const router = express.Router();

router.post("/", createUserHandler);
router.get("/", getAllUsersHandler);
router.get("/:id", getUserByIdHandler);
router.post("/:userId/comments", createCommentForUserHandler);
router.get("/:userId/comments", getAllCommentsForUserHandler);

export default router;
