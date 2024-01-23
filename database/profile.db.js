import ShortUUID from "short-uuid";
import { getCollections } from "./connect.js";

const { generate } = ShortUUID;

async function createProfile(profile) {
    const { profileCollection } = await getCollections();
    const id = generate();
    await profileCollection.insertOne({ ...profile, id });
    return id;
}

async function getAllProfiles() {
    const { profileCollection } = await getCollections();

    return profileCollection.find({}).toArray();
}

async function getProfileById(id) {
    const { profileCollection } = await getCollections();
    try {
        const profile = await profileCollection.findOne({ id });
        return profile;
    } catch (error) {
        return null;
    }
}

export { createProfile, getAllProfiles, getProfileById };
