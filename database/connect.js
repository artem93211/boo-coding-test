import { MongoClient } from 'mongodb';
import { MongoMemoryServer } from 'mongodb-memory-server';

import { databaseName, collectionName, demoProfile } from '../constants.js';

const mongod = new MongoMemoryServer();

async function connectDatabase(action) {
    //  Start database if it's first time to connect
    if (action === 'init') {
        await mongod.start();
    }

    // Connect database
    const uri = await mongod.getUri();
    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db(databaseName);
    const profileCollection = db.collection(collectionName);

    // Insert one record if there is no record
    const profileCount = await profileCollection.countDocuments();
    if (profileCount === 0) {
        await profileCollection.insertOne({
            ...demoProfile
        });
    }
    return { profileCollection };
}

async function getCollections() {
    return await connectDatabase("service");
}


export { getCollections, connectDatabase };
