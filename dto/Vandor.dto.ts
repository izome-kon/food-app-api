export interface CreateVandorInput {
    name: string;
    ownerName: string;
    foodType: string;
    pinCode: string;
    address: string;
    phone: string;
    email: string;
    password: string;
}

export interface VandorLoginInput {
    email: string;
    password: string;
}

export interface VandorPayload {
    id: string;
    email: string;

}