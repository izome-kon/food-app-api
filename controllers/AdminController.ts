import { Request, Response, NextFunction } from "express";
import { CreateVandorInput } from "../dto";
import { Vandor } from "../models";
import { GeneratePassword, GenerateSlat } from "../utility";

export const FindVandor = async (id: string | undefined, email?: string) => {
    if (email) {
        return await Vandor.findOne({ email });
    } else {
        return await Vandor.findById(id);
    }
}


export const CreateVandor = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, ownerName, foodType, pinCode, address, phone, email, password } = <CreateVandorInput>req.body;

        const existingVandor = await FindVandor(undefined, email);
        if (existingVandor !== null) {
            res.status(400).json({ message: "Vendor with this email already exists" });
        }

        // generate salt
        const salt = await GenerateSlat();
        const hashedPassword = await GeneratePassword(password, salt);

        // encrypt password
        const createdVandor = await Vandor.create({
            name,
            ownerName,
            foodType,
            pinCode,
            address,
            phone,
            email,
            password: hashedPassword,
            salt: salt,
            serviceAvailable: false,
            coverImage: [],
        });

        res.status(201).json({ message: "Vendor created successfully", data: createdVandor });
    } catch (error) {
        next(error);
    }
}

export const GetVandors = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const vendors = await Vandor.find();
        res.status(200).json({ message: "Vendors retrieved successfully", data: vendors });
    } catch (error) {
        next(error);
    }
}
export const GetVandorById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const vendor = await FindVandor(id);
        if (!vendor) {
            res.status(404).json({ message: "Vendor not found" });
        }
        res.status(200).json({ message: "Vendor retrieved successfully", data: vendor });
    } catch (error) {
        next(error);
    }
}