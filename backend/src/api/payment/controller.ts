import { Request, Response } from "express";
import { cartCollection, classesCollection, enrolledCollection, paymentCollection } from "../../config/database";
import { ObjectId } from "mongodb";
import Stripe from "stripe";

const stripe = new Stripe(`${process.env.STRIPE_SECRET}`);

export const createPaymentIntent = async (req: Request, res: Response) => {
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
}

export const createPaymentInfo = async (req: Request, res: Response) => {
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
              classes.reduce((total, current) => total + current.totalEnrolled, 0) + 1 || 0,
            availableSeats:
              classes.reduce((total, current) => total + current.availableSeats, 0) - 1 || 0,
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
}



export const getPaymentHistoryByEmail = async (req: Request, res: Response) => {
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
}

export const getPaymentHistoryLength = async (req: Request, res: Response) => {
    try {
        const email = req.params.email;
        const query = { userEmail: email };

        const total = await paymentCollection.countDocuments(query);

        res.send({ total });
      } catch (error) {
        console.error(error);
        res.status(500).send({ error: "An error occurred" });
      }
}

