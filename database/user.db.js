import ShortUUID from "short-uuid";
import { getCollections } from "./connect.js";

const { generate } = ShortUUID;

export async function createUser(user) {
    const { userCollection } = await getCollections();
    const id = generate();
    await userCollection.insertOne({ ...user, id, createdAt: Date.now() });
    return id;
}

export async function getAllUsers() {
    const { userCollection } = await getCollections();
    return userCollection.find({}).toArray();
}

export async function getUserById(id) {
    const { userCollection } = await getCollections();
    try {
        const user = await userCollection.findOne({ id });
        return user;
    } catch (error) {
        return null;
    }
}
