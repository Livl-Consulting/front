import {Opportunity} from "@/models/opportunity";
import { SaleOrder } from "./sale-order";

export type Client = {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    lastName: string;
    firstName: string;
    companyName?: string;
    email: string;
    opportunities: Opportunity[];
    orders: SaleOrder[];
}