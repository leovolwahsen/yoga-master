import { Request } from "express";
import { IncomingHttpHeaders } from "http";

export interface DecodedToken {
    userId: string;
    email: string;
}

export interface DecodedRequest extends Request {
    headers: IncomingHttpHeaders & {
        authorization: string;
    };
    decoded?: DecodedToken;
}
