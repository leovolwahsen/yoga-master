import { Request, Response } from "express";
import { imagesCollection } from "../../config/database";

export const getAllImages = async (req: Request, res: Response) => {
    try {
        const result = await imagesCollection.find().toArray();

        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "An error occurred" });
    }
}