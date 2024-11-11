import { NextFunction, Request, Response } from "express";
import  jwt  from "jsonwebtoken"
import { DecodedRequest, DecodedToken } from "../../types/authentication";

const jwtToken = process.env.JWT_TOKEN as string;

export const createToken = async (req: Request, res: Response) => {
    const user = req.body;
    const token = jwt.sign(user, jwtToken, {
        expiresIn: '24h'
    });
    res.send({token})
}

export const verifyJWT = async (req: DecodedRequest, res: Response, next: NextFunction) => {
    const authentication = req.headers.authorization;
    if (!authentication) {
        return res.status(401).send({ message: 'Invalid authorization' });
    }

    const token = authentication?.split(' ')[1];

    jwt.verify(token, jwtToken, (err, decoded) => {
        if (err) {
            return res.status(403).send({ message: 'Forbidden access' });
        }
        req.decoded = decoded as DecodedToken;
        next();
    });
}

