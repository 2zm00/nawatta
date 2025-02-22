import { MongoClient, Db } from "mongodb";

if (!process.env.MONGODB_URI) {
throw new Error("Please add your MongoDB URI to .env.local");
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
var _mongoClientPromise: Promise<MongoClient>;
}

const uri: string = process.env.MONGODB_URI;

if (process.env.NODE_ENV === "development") {
if (!global._mongoClientPromise) {
client = new MongoClient(uri);
global._mongoClientPromise = client.connect();
}
clientPromise = global._mongoClientPromise;
} else {
// 프로덕션 환경에서는 매 요청마다 새 클라이언트를 생성합니다.
client = new MongoClient(uri);
clientPromise = client.connect();
}

export async function connectToDatabase(): Promise<{ db: Db; client: MongoClient }> {
const client = await clientPromise;
const dbName = process.env.MONGODB_DATABASE; 
if (!dbName) {
throw new Error("Please add your MongoDB database name to .env.local as MONGODB_DB");
}
const db: Db = client.db(dbName);
return { db, client };
}