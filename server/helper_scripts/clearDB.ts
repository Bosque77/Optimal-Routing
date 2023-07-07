import config from "../utils/config";
const MongoClient = require('mongodb').MongoClient;

async function clearDatabase(uri: string, dbName: string) {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        const db = client.db(dbName);
        const collections = await db.listCollections().toArray() as any[];

        await Promise.all(collections.map(async (collection) => {
            return db.collection(collection.name).drop();
        }));
        console.log('Database cleared successfully');
    } catch(err) {
        console.error(err);
    } finally {
        await client.close();
    }
}

// Use the function
clearDatabase(config.MONGODB_URI as string, 'routeoptimization');

