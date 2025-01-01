import {Opportunity} from "@/models/opportunity";

export type Client = {
    id: number;
    createdAt: Date;
    updateAt: Date;
    lastName: string;
    firstName: string;
    companyName?: string;
    email: string;
    opportunities: Opportunity[];
}