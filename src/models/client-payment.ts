import { Client } from "./client";
import { PaymentMethod } from "./payment-method";
import { SaleOrder } from "./sale-order";

export type ClientPayment = {
    id: number;
    clientId: number;
    client: Client;
    amount: number;
    notes?: string;
    paymentMethod: PaymentMethod;
    paymentDate: string;
    orderId: number;
    order: SaleOrder;
    createdAt: string;
    updatedAt: string;
};