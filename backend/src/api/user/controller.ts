import { Request, Response } from "express";
import { userCollections } from "../../config/database";
import { User } from "../../types/users";
import { ObjectId } from "mongodb";

export const createUser = async (req: Request, res: Response) => {
  try {
    const newUser: User = req.body;
    const result = await userCollections.insertOne(newUser);

    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "An error occurred" });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await userCollections.find({}).toArray();

    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "An error occurred" });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const result = await userCollections.findOne(query);

    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "An error occurred" });
  }
}

export const getUserByEmail = async (req: Request, res: Response) => {
  try {
    const email = req.params.email;
    const query = { email: email };
    const result = await userCollections.findOne(query);

    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'An error occurred' });
  }
}

export const updateUserById = async (req: Request, res: Response) => {
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
};

export const deleteUserById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const result = await userCollections.deleteOne(query);

    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'An error occurred' });
  }
};