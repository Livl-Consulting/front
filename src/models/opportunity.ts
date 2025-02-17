import { Client } from "@/models/client";
import { Product } from "./product";
import {ProcessStatus} from "@/models/process-status.type";
import { Quote } from "./quote";

export type Opportunity = {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    successProbability: number;
    status: ProcessStatus;
    clientId: number;
    client: Client;
    productId: number;
    product: Product;
    price: number;
    quote: Quote[]
    quoteId: number;
}