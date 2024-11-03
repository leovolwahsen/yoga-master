const express = require('express');
const app = express();
require('dotenv').config();
const cors = require("cors");
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
      try {
        const newClass = req.body;
        // newClass.availableSeats = parseInt(newClass.availableSeats);
        const result = await classesCollection.insertOne(newClass);
        res.send(result);
      } catch (error) {
        console.error(error);
        res.status(500).send({ error: "An error occurred" });
      }
    })

    app.get("/classes", async (req, res) => {
      try {
        const query = { status: "approved" };
        const result = await classesCollection.find().toArray()
        res.send(result);
      } catch (error) {
        console.error(error);
        res.status(500).send({ error: "An error occurred" });
      }
    })

    // Get classes by instructor email address
    app.get("/classes/:email", async (req, res) => {
      try {
        const email = req.params.email;
        const query = { instructorEmail: email };
        const result = await classesCollection.find(query).toArray();
        res.send(result);
      } catch (error) {
        console.error(error);
        res.status(500).send({ error: "An error occurred" });
      }
    })

    // manage classes
    app.get(`/classes-manage`, async (req, res) => {
      try {
        const result = await classesCollection.find().toArray();
        res.send(result);
      } catch (error) {
        console.error(error);
        res.status(500).send({ error: "An error occurred" });
      }
    })

    // update classes status reason
    app.patch('/change-status/:id', async (req, res) => {
      try {
        const id = req.params.id;
        const status = req.body.status;
        const reason = req.body.reason;
        const filter = { _id: new ObjectId(id) };
        const options = { upsert: true };
        const updateDoc = {
          $set: {
            status: status,
            reason: reason,
          },
        };
        const result = await classesCollection.updateOne(filter, updateDoc, options);
        res.send(result);
      } catch (error) {
        console.error(error);
        res.status(500).send({ error: "An error occurred" });
      }
    })

    // get approved classes
    app.get('/approved-classes', async (req, res) => {
      try {
        const query = { status: "approved" };
        const result = await classesCollection.find(query).toArray();
        res.send(result);
      } catch (error) {
        console.error(error);
        res.status(500).send({ error: "An error occurred" });
      }
    })

    // get single class details
    app.get('/class/:id', async (req, res) => {
      try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await classesCollection.findOne(query);
        res.send(result);
      } catch (error) {
        console.error(error);
        res.status(500).send({ error: "An error occurred" });
      }
    })

    // update class details and override entire body of object
    app.put('/update-class/:id', async (req, res) => {
      try {
        const id = req.params.id;
        const updateClass = req.body;
        const filter = { _id: new ObjectId(id) };
        const options = { upsert: true };
        const updateDoc = {
          $set: {
            name: updateClass.name,
            description: updateClass.description,
            price: updateClass.price,
            availableSeats: parseInt(updateClass.availableSeats),
            videoLink: updateClass.videoLink,
            status: 'pending'
          }
        };
        const result = await classesCollection.updateOne(filter, updateDoc, options);
        res.send(result)
      } catch (error) {
        console.error(error);
        res.status(500).send({ error: "An error occurred" });
      }
    })

    // Cart Routes
    app.post('/add-to-cart', async (req, res) => {
      try {
        const newCartItem = req.body;
        const result = await cartCollection.insertOne(newCartItem);
        res.send(result);
      } catch (error) {
        console.error(error);
        res.status(500).send({ error: "An error occurred" });
      }
    })

    // get cart item by id
    app.get('/cart-item/:id', async (req, res) => {
      try {
        const id = req.params.id;
        const email = req.body.email;
        const query = {
          classId: id,
          userMail: email
        };
        const projection = { classId: 1 };
        const result = await cartCollection.findOne(query, { projection: projection });
        res.send(result);
      } catch (error) {
        console.error(error);
        res.status(500).send({ error: "An error occurred" });
      }
    })

    // cart info by user email
    app.get('/cart/:email', async (req, res) => {
      try {
        const email = req.params.email;
        const query = { userMail: email };
        const projection = { classId: 1 };

        const carts = await cartCollection.find(query, { projection }).toArray();
        const classIds = carts.map(cart => new ObjectId(cart.classId));

        const query2 = { _id: { $in: classIds } };
        const result = await classesCollection.find(query2).toArray();

        res.send(result);
      } catch (error) {
        console.error(error);
        res.status(500).send({ error: "An error occurred" });
      }
    });


    // delete cart item
    app.delete('/delete-cart-item/:id', async (req, res) => {
      try {
        const id = req.params.id;
        const query = { classId: id };
        const result = await cartCollection.deleteOne(query);
        res.send(result);
      } catch (error) {
        console.error(error);
        res.status(500).send({ error: "An error occurred" });
      }
    })

    // Payments route


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
