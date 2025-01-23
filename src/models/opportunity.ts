import { Client } from "@/models/client";
import { Product } from "./product";
import {OpportunityStatus} from "@/models/opportunity-status.type";

export type Opportunity = {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    successProbability: number;
    status: OpportunityStatus;
    clientId: number;
    client: Client;
    productId: number;
    product: Product;
}