import { Request, Response } from 'express';
import { subscribedCollection } from '../../config/database';

export const createSubscribed = async (req: Request, res: Response) => {
    try {
        const newSubscribed = req.body;
        const result = await subscribedCollection.insertOne(newSubscribed);

        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'new newsletter subscription not updated successfully!' });
    }
}

export const getAllSubscribed = async (req: Request, res: Response) => {
    try {
        const result = await subscribedCollection.find().toArray();

        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'An error occurred when fetching all subscriptions' });
    }
}
