import { Request, Response } from "express";
import { appliedCollection } from "../../config/database";

export const createNewInstructorApplicant = async (req: Request, res: Response) => {
    try {
        const data = req.body;
        const result = await appliedCollection.insertOne(data);

        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'An error occurred' });
    }
}

export const getInstructorByEmail = async (req: Request, res: Response) => {
    try {
        const email = req.params.email;
        const result = await appliedCollection.findOne({ email });

        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'An error occurred' });
    }
}

