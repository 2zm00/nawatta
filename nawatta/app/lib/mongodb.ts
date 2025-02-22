import { MongoClient, Db } from "mongodb";

const uri = process.env.NEXT_ATLAS_URI;
const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
} as const;

interface MongoConnection {
    mongoClient: MongoClient | null;
    database: Db | null;
}

// global 타입 확장
declare global {
    var _mongoClient: MongoClient | null;
}

let mongoClient: MongoClient | null = null;
let database: Db | null = null;

if (!process.env.NEXT_ATLAS_URI) {
    throw new Error('Please add your Mongo URI to .env.local');
}

export async function connectToDatabase(): Promise<MongoConnection> {
    try {
        if (mongoClient && database) {
            return { mongoClient, database };
        }

        if (process.env.NODE_ENV === "development") {
            if (!global._mongoClient) {
                mongoClient = await (new MongoClient(uri!, options)).connect();
                global._mongoClient = mongoClient;
            } else {
                mongoClient = global._mongoClient;
            }
        } else {
            mongoClient = await (new MongoClient(uri!, options)).connect();
        }

        database = await mongoClient.db(process.env.NEXT_ATLAS_DATABASE!);
        return { mongoClient, database };
    } catch (e) {
        console.error(e);
        throw new Error('Failed to connect to database');
    }
}
