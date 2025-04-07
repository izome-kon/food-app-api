import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AuthPayload, VandorPayload } from '../dto';
import { Request } from 'express';

export const GenerateSlat = async () => {
    return await bcrypt.genSalt(10);
}

export const GeneratePassword = async (password: string, salt: string) => {
    return await bcrypt.hash(password, salt);
}

export const ValidatePassword = async (password: string, hashedPassword: string, salt: string) => {
    const hashedInputPassword = await GeneratePassword(password, salt);
    return hashedInputPassword === hashedPassword;
}

export const GenerateSignature = async (payload: VandorPayload) => {
    const token = await jwt.sign(payload, process.env.JWT_SECRET as string || 'mysecret', {
        expiresIn: '1h'
    });
    return token;
}

export const VerifySignature = async (req: Request) => {
    const token = req.headers['Authorization'] as string;
    if (token) {
        const payload = await jwt.verify(token, process.env.JWT_SECRET as string || 'mysecret') as AuthPayload;
        req.user = payload;
        return true;
    }
    return false;
}