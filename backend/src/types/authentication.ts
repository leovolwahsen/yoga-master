import { Request } from "express";

export interface DecodedToken {
    userId: string;
    email: string;
}

export interface DecodedRequest extends Request {
    decoded?: DecodedToken;
}
