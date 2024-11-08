import { MongoClient, Db, Collection, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@yoga-master.vy0qr.mongodb.net/?retryWrites=true&w=majority&appName=yoga-master`;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export let db: Db;
export let userCollections: Collection;
export let classesCollection: Collection;
export let cartCollection: Collection;
export let paymentCollection: Collection;
export let enrolledCollection: Collection;
export let appliedCollection: Collection;

export async function connectToDatabase(): Promise<void> {
  try {
    await client.connect();
    db = client.db("yoga-master");

    userCollections = db.collection("users");
    classesCollection = db.collection("classes");
    cartCollection = db.collection("cart");
    paymentCollection = db.collection("payments");
    enrolledCollection = db.collection("enrolled");
    appliedCollection = db.collection("applied");

    console.log("Connected to MongoDB and initialized collections.");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    throw error;
  }
}

