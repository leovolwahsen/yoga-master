import { DecodedToken } from "./authentication";

declare global {
    namespace Express {
        interface Request {
            decoded?: DecodedToken;
        }
    }
}

export { }; 