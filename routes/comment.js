import express from "express";
import {
    likeCommentHandler,
    unLikeCommentHandler,
} from "../controllers/comment.controller.js";

const router = express.Router();

router.post("/:commentId/like", likeCommentHandler);
router.post("/:commentId/unlike", unLikeCommentHandler);

export default router;
