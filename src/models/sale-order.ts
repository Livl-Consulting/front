import { Client } from "@/models/client";
import { Product } from "./product";
import { Quote } from "./quote";
import { SaleOrderStatus } from "./sale-order-status";

export type SaleOrder = {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    dueDate: Date;
    status: SaleOrderStatus;
    clientId: number;
    client: Client;
    productId: number;
    product: Product;
    price: number;
    quote: Quote[]
    quoteId: number;
    clientPayments: SaleOrder[]
}