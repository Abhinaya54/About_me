import { MongoClient } from 'mongodb';

const mongoUri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB_NAME || 'about_me';
const collectionName = process.env.MONGODB_COLLECTION || 'submissions';

if (!mongoUri) {
  throw new Error('MONGODB_URI is required. Add it to your Vercel Environment Variables.');
}

let cachedClient = null;
let cachedDb = null;

export async function getCollection() {
  if (cachedDb) {
    return cachedDb.collection(collectionName);
  }

  const client = new MongoClient(mongoUri);
  await client.connect();
  const db = client.db(dbName);

  cachedClient = client;
  cachedDb = db;

  return db.collection(collectionName);
}

