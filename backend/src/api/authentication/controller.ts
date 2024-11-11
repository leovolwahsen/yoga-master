import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { DecodedRequest, DecodedToken } from "../../types/authentication";

const jwtToken = process.env.JWT_TOKEN as string;

export const createToken = (req: Request, res: Response) => {
    const user = req.body;
    const token = jwt.sign(user, jwtToken, { expiresIn: '24h' });
    res.send({ token });
};

export const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
    const authentication = req.headers.authorization;
    if (!authentication) {
        res.status(401).send({ message: 'Invalid authorization' });
        return; 
    }

    const token = authentication.split(' ')[1];

    try {
        const decoded = jwt.verify(token, jwtToken) as DecodedToken;
        (req as DecodedRequest).decoded = decoded;  
        next();
    } catch (err) {
        res.status(403).send({ message: 'Forbidden access' });
    }
};
