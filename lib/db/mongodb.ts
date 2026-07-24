import { MongoClient, Db } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://tormentoinks_db_user:VyIYoDktGHvh5jbW@pydungeon.ubcmgsi.mongodb.net/python_bootcamp?retryWrites=true&w=majority";
const MONGODB_DB = process.env.MONGODB_DB || "python_bootcamp";

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function connectToDatabase(): Promise<{ client: MongoClient; db: Db }> {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = new MongoClient(MONGODB_URI);
  await client.connect();
  const db = client.db(MONGODB_DB);

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}
