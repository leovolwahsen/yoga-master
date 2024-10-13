const express = require('express');
const app = express();
require('dotenv').config();
const cors = require("cors");
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@yoga-master.vy0qr.mongodb.net/?retryWrites=true&w=majority&appName=yoga-master";`

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();

    // create a database and collections
    const database = client.db("yoga-master");
    const userCollections = database.collection("users");
    const classesCollection = database.collection("classes");
    const cartCollection = database.collection("cart");
    const paymentCollection = database.collection("payments");
    const enrolledCollection = database.collection("enrolled");
    const appliedCollection = database.collection("applied");

    // classes routes here
    app.post("/new-class", async (req, res) => {
        const newClass = req.body;
        // newClass.availableSeats = parseInt(newClass.availableSeats);
        const result = await classesCollection.insertOne(newClass);
        res.send(result);
    });

    app.get("/classes", async (req, res) => {
        const query = { status: "approved" };
        const result = await classesCollection.find().toArray()
        res.send(result)
    })

    // Get classes by instructor email address
    app.get("/classes/:email", async (req, res) => {
        const email = req.params.email;
        const query = {instructorEmail: email};
        const result = await classesCollection.find(query).toArray();
        res.send(result);
    })

    

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

  } catch (error) {
    console.error("Error occurred while connecting to MongoDB: ", error);
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Hello Developers in the future!')
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
