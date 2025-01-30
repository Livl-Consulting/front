"use server"

import { revalidatePath } from "next/cache";
import { apiUrl } from "../utils";
import { PurchaseOrder } from "@/models/purchase-order";

export const createPurchaseOrderFromPriceRequest = async (priceRequestId: number): Promise<{ results: PurchaseOrder }> => {

    if (!priceRequestId) {
        throw new Error('Price request id is required');
    }

    const API_URL = apiUrl();

    const response = await fetch(`${API_URL}/price-requests/order/${priceRequestId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    if (!response.ok) {
        const data = await response.text();
        throw new Error(`${response.statusText} : ${data}`);
    }

    revalidatePath('/price-requests')

    return {
        results: await response.json()
    };
}