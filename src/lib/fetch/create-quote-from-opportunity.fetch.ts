"use server"

import { revalidatePath } from "next/cache";
import { apiUrl } from "../utils";
import { Quote } from "@/models/quote";

export const createQuoteFromOpportunity= async (opportunityId: number): Promise<{ results: Quote }> => {

    if (!opportunityId) {
        throw new Error('Opportunity id is required');
    }

    const API_URL = apiUrl();

    const response = await fetch(`${API_URL}/opportunities/quote/${opportunityId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    if (!response.ok) {
        const data = await response.text();
        throw new Error(`${response.statusText} : ${data}`);
    }

    revalidatePath('/opportunities')

    return {
        results: await response.json()
    };
}