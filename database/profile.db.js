import { getCollections } from "./connect.js";

async function createProfile(profile) {
    const { profileCollection } = await getCollections();
    const count = await profileCollection.countDocuments();
    const id = count + 1;
    return profileCollection.insertOne({ id, ...profile });
}

async function getAllProfiles() {
    const { profileCollection } = await getCollections();

    return profileCollection.find({}).toArray();
}

async function getProfileById(id) {
    const { profileCollection } = await getCollections();
    return profileCollection.findOne({ id });
}

export {
    createProfile,
    getAllProfiles,
    getProfileById,
};
