import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Stripe from "stripe";

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;
const stripe = new Stripe(`${process.env.STRIPE_SECRET}`);
// middleware
app.use(cors());
app.use(express.json());

import { MongoClient, ServerApiVersion, ObjectId } from "mongodb";

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@yoga-master.vy0qr.mongodb.net/?retryWrites=true&w=majority&appName=yoga-master`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
let isConnected = false;
async function run() {
  try {
    if (!isConnected) {
      // Connect the client to the server
      await client.connect();
      isConnected = true;
    }

    // create a database and collections
    const database = client.db("yoga-master");
    const userCollections = database.collection("users");
    const classesCollection = database.collection("classes");
    const cartCollection = database.collection("cart");
    const paymentCollection = database.collection("payments");
    const enrolledCollection = database.collection("enrolled");
    const appliedCollection = database.collection("applied");

    // create users routes
    app.post('/new-user', async (req, res) => {
      try {
        const newUser = req.body;
        const result = await userCollections.insertOne(newUser);

        res.send(result);

      } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'An error occurred' });
      }
    });

    // get all users
    app.get('/users', async (req, res) => {
      try {
        const result = await userCollections.find({}).toArray();

        res.send(result);

      } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'An error occurred' });
      }
    });

    // get user by id
    app.get('/users/:id', async (req, res) => {
      try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };

        const result = await userCollections.findOne(query);

        res.send(result);

      } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'An error occurred' });
      }
    });

    // get user by email
    app.get('/users/:email', async (req, res) => {
      try {
        const email = req.params.email;
        const query = { email: email };

        const result = await userCollections.findOne(query);

        res.send(result);

      } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'An error occurred' });
      }
    });

    // delete user by id
    app.delete('/delete-user/:id', async (req, res) => {
      try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };

        const result = await userCollections.deleteOne(query);

        res.send(result);

      } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'An error occurred' });
      }
    });

    // update user by id
    app.put('/update-user/:id', async (req, res) => {
      try {
        const id = req.params.id;
        const updatedUser = req.body;

        const filter = {
          _id: new ObjectId(id)
        };

        const options = {
          upsert: true
        };

        const updateDoc = {
          $set: {
            name: updatedUser.name,
            email: updatedUser.email,
            role: updatedUser.options,
            address: updatedUser.address,
            about: updatedUser.about,
            photoUrl: updatedUser.photoUrl,
            skills: updatedUser.skills ? updatedUser.skills : null
          }
        }

        const result = await userCollections.updateOne(filter, updateDoc, options);

        res.send(result);

      } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'An error occurred' });
      }
    })

    // create classes routes
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
    });

    // get all classes data
    app.get("/classes", async (req, res) => {
      try {
        const query = { status: "approved" };
        const result = await classesCollection.find().toArray();

        res.send(result);

      } catch (error) {
        console.error(error);
        res.status(500).send({ error: "An error occurred" });
      }
    });

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
    });

    // manage classes
    app.get(`/classes-manage`, async (req, res) => {
      try {
        const result = await classesCollection.find().toArray();

        res.send(result);

      } catch (error) {
        console.error(error);
        res.status(500).send({ error: "An error occurred" });
      }
    });

    // update classes status reason
    app.patch("/change-status/:id", async (req, res) => {
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

        const result = await classesCollection.updateOne(
          filter,
          updateDoc,
          options
        );

        res.send(result);

      } catch (error) {
        console.error(error);
        res.status(500).send({ error: "An error occurred" });
      }
    });

    // get approved classes
    app.get("/approved-classes", async (req, res) => {
      try {
        const query = { status: "approved" };
        const result = await classesCollection.find(query).toArray();

        res.send(result);

      } catch (error) {
        console.error(error);
        res.status(500).send({ error: "An error occurred" });
      }
    });

    // get single class details
    app.get("/class/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await classesCollection.findOne(query);

        res.send(result);

      } catch (error) {
        console.error(error);
        res.status(500).send({ error: "An error occurred" });
      }
    });

    // update class details and override entire body of object
    app.put("/update-class/:id", async (req, res) => {
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
            status: "pending",
          },
        };

        const result = await classesCollection.updateOne(
          filter,
          updateDoc,
          options
        );

        res.send(result);

      } catch (error) {
        console.error(error);
        res.status(500).send({ error: "An error occurred" });
      }
    });

    // Cart Routes
    app.post("/add-to-cart", async (req, res) => {
      try {
        const newCartItem = req.body;
        const result = await cartCollection.insertOne(newCartItem);

        res.send(result);

      } catch (error) {
        console.error(error);
        res.status(500).send({ error: "An error occurred" });
      }
    });

    // get cart item by id
    app.get("/cart-item/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const email = req.body.email;

        const query = {
          classId: id,
          userMail: email,
        };

        const projection = { classId: 1 };

        const result = await cartCollection.findOne(query, {
          projection: projection,
        });

        res.send(result);

      } catch (error) {
        console.error(error);
        res.status(500).send({ error: "An error occurred" });
      }
    });

    // cart info by user email
    app.get("/cart/:email", async (req, res) => {
      try {
        const email = req.params.email;
        const query = { userMail: email };
        const projection = { classId: 1 };

        const carts = await cartCollection
          .find(query, { projection })
          .toArray();

        const classIds = carts.map((cart) => new ObjectId(cart.classId));

        const query2 = { _id: { $in: classIds } };

        const result = await classesCollection.find(query2).toArray();

        res.send(result);

      } catch (error) {
        console.error(error);
        res.status(500).send({ error: "An error occurred" });
      }
    });

    // delete cart item
    app.delete("/delete-cart-item/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const query = { classId: id };

        const result = await cartCollection.deleteOne(query);

        res.send(result);

      } catch (error) {
        console.error(error);
        res.status(500).send({ error: "An error occurred" });
      }
    });

    // Payments route
    app.post("/create-payment-intent", async (req, res) => {
      try {
        const { price } = req.body;
        const amount = parseInt(price) * 100;

        const paymentIntent = await stripe.paymentIntents.create({
          amount: amount,
          currency: "eur",
          payment_method_types: ["card"],
        });

        res.send({
          clientSecret: paymentIntent.client_secret,
        });

      } catch (error) {
        console.error(error);
        res.status(500).send({ error: "An error occurred" });
      }
    });

    // Post payment info to db
    app.post("/payment-info", async (req, res) => {
      try {
        const paymentInfo = req.body;
        const classesId = paymentInfo.classesId.map((id: string) => new ObjectId(id)); 
        const userEmail = paymentInfo.userEmail;
        const singleClassId = typeof req.query.classId === 'string' ? new ObjectId(req.query.classId) : undefined;

        let query;
        if (singleClassId) {
          query = { classId: singleClassId, userMail: userEmail };
        } else {
          query = { classId: { $in: classesId } };
        }

        const classesQuery = {
          _id: { $in: classesId },
        };

        const classes = await classesCollection.find(classesQuery).toArray();

        const newEnrolledData = {
          userEmail: userEmail,
          classId: singleClassId ? [singleClassId] : classesId,
          transactionId: paymentInfo.transactionId,
        };

        const updatedDoc = {
          $set: {
            totalEnrolled:
              classes.reduce(
                (total, current) => total + current.totalEnrolled,
                0
              ) + 1 || 0,
            availableSeats:
              classes.reduce(
                (total, current) => total + current.availableSeats,
                0
              ) - 1 || 0,
          },
        };

        const updatedResult = await classesCollection.updateMany(
          classesQuery,
          updatedDoc,
          { upsert: true }
        );
        const enrolledResult = await enrolledCollection.insertOne(
          newEnrolledData
        );
        const deletedResult = await cartCollection.deleteMany(query);
        const paymentResult = await paymentCollection.insertOne(paymentInfo);

        res.send({
          paymentResult,
          deletedResult,
          enrolledResult,
          updatedResult,
        });

      } catch (error) {
        console.error(error);
        res.status(500).send({ error: "An error occurred" });
      }
    });

    // get payment history
    app.get("/payment-history/:email", async (req, res) => {
      try {
        const email = req.params.email;
        const query = { userEmail: email };

        const result = await paymentCollection
          .find(query)
          .sort({ date: -1 })
          .toArray();

        res.send(result);

      } catch (error) {
        console.error(error);
        res.status(500).send({ error: "An error occurred" });
      }
    });

    // get payment history length
    app.get("/payment-history-length/:email", async (req, res) => {
      try {
        const email = req.params.email;
        const query = { userEmail: email };

        const total = await paymentCollection.countDocuments(query);

        res.send({ total });

      } catch (error) {
        console.error(error);
        res.status(500).send({ error: "An error occurred" });
      }
    });

    // get enrollment routes
    app.get('/popular_classes', async (req, res) => {
      try {
        const result = await classesCollection.find().sort({ totalEnrolled: -1 }).limit(6).toArray();

        res.send(result);

      } catch (error) {
        console.error(error);
        res.status(500).send({ error: "An error occurred" });
      }
    });

    // get enrollement instructor data
    app.get('/popular-instructors', async (req, res) => {
      try {
        const pipeline = [
          {
            $group: {
              _id: '$instructorEmail',
              totalEnrolled: { $sum: '$totalEnrolled' }
            }
          },
          {
            $lookup: {
              from: 'users',
              localField: '_id',
              foreignField: 'email',
              as: 'instructor'
            }
          },
          {
            $project: {
              _id: 0,
              instructor: {
                $arrayElemAt: ['instructor', 0]
              },
              totalEnrolled: 1
            }
          },
          {
            $sort: {
              totalEnrolled: -1
            }
          },
          {
            $limit: 6
          }
        ];

        const result = await classesCollection.aggregate(pipeline).toArray();

        res.send(result);

      } catch (error) {
        console.error(error);
        res.status(500).send({ error: "An error occurred" });
      }
    });

    // get admin status
    app.get('/admin-status', async (req, res) => {
      try {
        const approvedClasses = (await (classesCollection.find({ status: 'approved' }).toArray())).length;
        const pendingClasses = (await (classesCollection.find({ status: 'pending' }).toArray())).length;
        const instructors = (await (userCollections.find({ role: 'instructor' }).toArray())).length;
        const totalClasses = (await classesCollection.find().toArray()).length;
        const totalEnrolled = (await enrolledCollection.find().toArray()).length;

        const result = {
          approvedClasses,
          pendingClasses,
          instructors,
          totalClasses,
          totalEnrolled
        }

        res.send(result)

      } catch (error) {
        console.error(error);
        res.status(500).send({ error: "An error occurred" });
      }
    });

    // get all instructors 
    app.get('/instructors', async (req, res) => {
      try {
        const result = await userCollections.find({ role: 'instructor' }).toArray();

        res.send(result);

      } catch (error) {
        console.error(error);
        res.status(500).send({ error: "An error occurred" });
      }
    });

    // get enrolled classes
    app.get('/enrolled-classes/:email', async (req, res) => {
      try {
        const email = req.params.email;
        const query = { userEmail: email };
        const pipeline = [
          {
            $match: query
          },
          {
            $lookup: {
              from: 'classes',
              localField: 'classesId',
              foreignField: '_id',
              as: 'class'
            }
          },
          {
            $unwind: '$classes'
          },
          {
            $lookup: {
              from: 'users',
              localField: 'classes.instructorEmail',
              foreignField: 'email',
              as: 'instructor'
            }
          },
          {
            $project: {
              _id: 0,
              instructor: {
                $arrayElemAt: ['$instructor', 0]
              },
              classes: 1
            }
          }
        ];

        const result = await enrolledCollection.aggregate(pipeline).toArray();

        res.send(result);

      } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'An error occurred' });
      }
    });

    // applied for instructors
    app.post('/yoga-instructor', async (req, res) => {
      try {
        const data = req.body;

        const result = await appliedCollection.insertOne(data);

        res.send(result);

      } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'An error occurred' });
      }
    });

    // get instructors by email
    app.get('/applied-instructors/:email', async (req, res) => {
      try {
        const email = req.params.email;
        const result = await appliedCollection.findOne({ email });

        res.send(result);

      } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'An error occurred' });
      }
    })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } catch (error) {
    console.error("Error occurred while connecting to MongoDB: ", error);
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello Developers in the future!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
