import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { VandorPayload } from '../dto';

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