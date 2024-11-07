import { Request, Response } from "express";
import { cartCollection, classesCollection } from "../../config/database";
import { CartItem } from "../../types/cartItem";
import { ObjectId } from "mongodb";

export const createCartItem = async (req: Request, res: Response) => {
    try {
        const newCartItem: CartItem = req.body;
        const result = await cartCollection.insertOne(newCartItem);

        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "An error occurred" });
    }
}

export const getCartItemById = async (req: Request, res: Response) => {
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
}

export const getCartItemByEmail = async (req: Request, res: Response) => {
    try {
        const email = req.params.email;
        const query = { userMail: email };
        const projection = { classId: 1 };

        const carts = await cartCollection
            .find(query, { projection })
            .toArray();

        const classIds = carts.map((cart) => new ObjectId(String(cart.classId)));

        const query2 = { _id: { $in: classIds } };

        const result = await classesCollection.find(query2).toArray();

        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "An error occurred" });
    }
}

export const deleteCartItemById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const query = { classId: id };

        const result = await cartCollection.deleteOne(query);

        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "An error occurred" });
    }
}

