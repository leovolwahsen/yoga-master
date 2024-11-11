import { Request, Response } from "express";
import { classesCollection } from "../../config/database";
import { Class } from "../../types/classes";
import { ObjectId } from "mongodb";

export const createClass = async (req: Request, res: Response) => {
    try {
        const newClass: Class = req.body;
        const result = await classesCollection.insertOne(newClass);

        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "An error occurred" });
    }
}

export const getAllClasses = async (req: Request, res: Response) => {
    try {
        const result = await classesCollection.find().toArray();

        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "An error occurred" });
    }
}

export const getClassById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await classesCollection.findOne(query);

        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "An error occurred" });
    }
}

export const getClassByEmail = async (req: Request, res: Response) => {
    try {
        const email = req.params.email;
        const query = { instructorEmail: email };
        const result = await classesCollection.find(query).toArray();

        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "An error occurred" });
    }
}

export const getManagedClasses = async (req: Request, res: Response) => {
    try {
        const result = await classesCollection.find().toArray();

        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "An error occurred" });
    }
}

export const updateClassStatusById = async (req: Request, res: Response) => {
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
}

export const getApprovedClasses = async (req: Request, res: Response) => {
    try {
        const query = { status: "approved" };
        const result = await classesCollection.find(query).toArray();

        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "An error occurred" });
    }
}

export const updateClassById = async (req: Request, res: Response) => {
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
}

