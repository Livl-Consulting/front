import { Client } from "./client";
import { Opportunity } from "./opportunity";
import { ProcessStatus } from "./process-status.type";
import { Product } from "./product";
import { SaleOrder } from "./sale-order";

export type Quote = {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    successProbability: number;
    status: ProcessStatus;
    clientId: number;
    client: Client;
    productId: number;
    product: Product;
    price?: number;
    opportunityId?: number;
    opportunity: Opportunity;
    order: SaleOrder;
    orderId: number;
}