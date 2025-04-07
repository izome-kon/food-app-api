import { Request, Response, NextFunction } from "express";
import { VandorLoginInput, VandorPayload } from "../dto";
import { FindVandor } from ".";
import { GenerateSignature, ValidatePassword } from "../utility";

export const VandorLogin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = <VandorLoginInput>req.body;

        // Check if vendor exists
        const vendor = await FindVandor('', email);
        if (vendor !== null) {
            const isPasswordValid = await ValidatePassword(password, vendor.password, vendor.salt);
            if (isPasswordValid) {
                // Generate JWT token
                const payload = {
                    id: vendor._id,
                    email: vendor.email,
                };
                const token = await GenerateSignature(payload as VandorPayload);
                res.status(200).json({ token, vendor });
            } else {
                res.status(401).json({ message: "Invalid password" });
            }
        }
        else {
            res.status(404).json({ message: "Vendor not found" });
        }

    } catch (error) {
        next(error);
    }
}

export const GetVandorProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const vendor = req.user;
        if (vendor) {
            res.status(200).json({ vendor });
        } else {
            res.status(404).json({ message: "Vendor not found" });
        }
    } catch (error) {
        next(error);
    }
}
export const UpdateVandorProfile = async (req: Request, res: Response, next: NextFunction) => {

}