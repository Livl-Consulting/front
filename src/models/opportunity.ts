import {Client} from "@/models/client";

export type Opportunity = {
    id: number;
    createdAt: Date;
    updateAt: Date;
    successOpportunity: number;
    status: 'progress' | 'validated' | 'cancelled';
    clientId: number;
    client: Client;
}