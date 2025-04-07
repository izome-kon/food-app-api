import { AuthPayload } from "../dto";

import { NextFunction, Response, Request } from "express";
import { VerifySignature } from "../utility";

declare global {
    namespace Express {
        interface Request {
            user?: AuthPayload;
        }
    }
}

export const Authenticate = async (req: Request, res: Response, next: NextFunction) => {
    const validate = await VerifySignature(req);

    if (validate) {
        next();
    } else {
        res.status(403).json({ message: "Unauthorized" });
    }
}