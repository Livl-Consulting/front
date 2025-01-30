"use server"

import { revalidatePath } from "next/cache";
import { apiUrl } from "../utils";
import { SaleOrder } from "@/models/sale-order";

export const createOrderFromQuote = async (quoteId: number): Promise<{ results: SaleOrder }> => {

    if (!quoteId) {
        throw new Error('Quote id is required');
    }

    const API_URL = apiUrl();

    const response = await fetch(`${API_URL}/quotes/order/${quoteId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    if (!response.ok) {
        const data = await response.text();
        throw new Error(`${response.statusText} : ${data}`);
    }

    revalidatePath('/quotes')

    return {
        results: await response.json()
    };
}