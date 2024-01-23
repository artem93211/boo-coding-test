import { MongoClient } from "mongodb";
import { MongoMemoryServer } from "mongodb-memory-server";

import { databaseName, collectionName, demoProfile, demoUser, demoComment } from "../constants.js";

const mongod = new MongoMemoryServer();

async function connectDatabase(action) {
    //  Start database if it's first time to connect
    if (action === "init") {
        await mongod.start();
    }

    // Connect database
    const uri = await mongod.getUri();
    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db(databaseName);
    const profileCollection = db.collection(collectionName.profile);
    const userCollection = db.collection(collectionName.user);
    const commentCollection = db.collection(collectionName.comment);

    // Insert one record if there is no record
    const profileCount = await profileCollection.countDocuments();
    if (profileCount === 0) {
        await profileCollection.insertOne({
            ...demoProfile
        });
    }
    const userCount = await userCollection.countDocuments();
    if (userCount === 0) {
        await userCollection.insertOne({
            ...demoUser
        })
    }
    const commentCount = await commentCollection.countDocuments();
    if (commentCount === 0) {
        await commentCollection.insertOne({
            ...demoComment
        })
    }
    return { profileCollection, userCollection, commentCollection };
}

async function getCollections() {
    return await connectDatabase("start");
}


export { getCollections, connectDatabase };
