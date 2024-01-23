import {
    createComment,
    getCommentById,
    likeComment,
    unLikeComment,
    getAllCommentsForUser,
} from "../database/comment.db.js"
import { getUserById } from "../database/user.db.js";

export async function createCommentForUserHandler(req, res) {
    try {
        const { userId } = req.params;
        const { title, description, vote } = req.body;
        if (!userId) {
            return res.status(404).send("User Id is required");
        }
        if (!title || !description) {
            return res.status(400).send("Missing detail of comment");
        }

        const comment = {
            title,
            vote,
            description,
            to: userId,
        }

        const commentId = await createComment(comment);
        if (!commentId) {
            return res.status(500).send("Failed to create comment");
        }
        return res.status(201).json({ message: `Created a new Comment for User ${userId}`, commentId });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

export async function getAllCommentsForUserHandler(req, res) {
    const userId = req.params.userId;
    const { filterBy, sortBy } = req.query;
    if (!userId) return res.status(400).send("User Id is required");

    try {
        const user = await getUserById(userId);
        if (!user) {
            return res.status(404).send("User not found");
        }
        let comments = await getAllCommentsForUser(userId);
        if (!comments) return res.status(200).json([]);
        if (filterBy && filterBy !== "all") {
            comments = comments.filter((comment) => comment.vote?.[filterBy])
        }

        if (sortBy === "recent") {
            comments.sort((a, b) => b.createdAt - a.createdAt);
        } else if (sortBy === "best") {
            comments.sort((a, b) => b.likes - a.likes);
        }
        return res.status(200).json(comments);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

export async function likeCommentHandler(req, res) {
    const { commentId } = req.params;
    if (!commentId) return res.status(400).send("Comment ID is required");

    try {
        const comment = await getCommentById(commentId);
        if (!comment) {
            return res.status(404).send("Comment not found");
        }
        const updatedComment = await likeComment(commentId);
        return res.status(200).json({ message: "Successfully liked", comment: updatedComment });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

export async function unLikeCommentHandler(req, res) {
    const { commentId } = req.params;
    if (!commentId) return res.status(400).send("Comment ID is required");

    try {
        const comment = await getCommentById(commentId);
        if (!comment) {
            return res.status(404).send("Comment not found");
        }
        const updatedComment = await unLikeComment(commentId);
        return res.status(200).json({ message: "Successfully disliked", comment: updatedComment });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}
