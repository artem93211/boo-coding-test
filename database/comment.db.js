import ShortUUID from "short-uuid";
import { getCollections } from "./connect.js";

const { generate } = ShortUUID;

export async function createComment(data) {
    const { commentCollection } = await getCollections();

    const id = generate();

    const comment = {
        ...data,
        id,
        likes: 0,
        createdAt: Date.now(),
    };

    commentCollection.insertOne(comment);
    return id;
}

export async function getCommentById(id) {
    const { commentCollection } = await getCollections();
    return commentCollection.findOne({ id });
}

export async function likeComment(id) {
    const { commentCollection } = await getCollections();
    const comment = await commentCollection.findOne({ id })
    return commentCollection.replaceOne({ id }, { ...comment, likes: comment.likes + 1 });
}

export async function unLikeComment(id) {
    const { commentCollection } = await getCollections();
    const comment = await commentCollection.findOne({ id })
    return commentCollection.replaceOne({ id }, { ...comment, likes: comment.likes - 1 });
}

export async function getAllCommentsForUser(userId) {
    const { commentCollection } = await getCollections();
    return commentCollection.find({ to: userId }).toArray();
}
