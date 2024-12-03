import {Opportunity} from "@/models/opportunity";

export type Client = {
    id: number;
    createdAt: Date;
    updateAt: Date;
    lastName: string;
    firstName: string;
    email: string;
    opportunities: Opportunity[];
}