import { Client } from "@/models/client";
import { Product } from "./product";

export type Opportunity = {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    successProbability: number;
    status: 'progress' | 'validated' | 'cancelled';
    clientId: number;
    client: Client;
    productId: number;
    product: Product;
}