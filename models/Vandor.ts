import mongoose, { Schema, Document, Model } from "mongoose";

interface VandorDoc extends Document {
    name: string;
    ownerName: string;
    foodType: [string];
    pinCode: string;
    address: string;
    phone: string;
    email: string;
    password: string;
    salt: string;
    serviceAvailable: boolean;
    coverImage: [string];
    rate: number;
    // foods: any
}

const VandorSchema: Schema = new Schema({
    name: { type: String, required: true },
    ownerName: { type: String, required: true },
    foodType: { type: [String] },
    pinCode: { type: String, required: true },
    address: { type: String },
    phone: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    salt: { type: String, required: true },
    serviceAvailable: { type: Boolean, default: false },
    coverImage: { type: [String] },
    rate: { type: Number, default: 0 },
    // foods: { type: [String] }
}, {
    timestamps: true, toJSON: {
        transform: (doc, ret) => {
            delete ret.password;
            delete ret.salt;
            delete ret.__v;
            delete ret.createdAt;
            delete ret.updatedAt;
            return ret;
        }
    }
});

const Vandor = mongoose.model<VandorDoc>("Vandor", VandorSchema);
export { Vandor };