"use server"

import { revalidatePath } from "next/cache";
import { apiUrl } from "../utils";

export const cancelPriceRequest = async (priceRequestId: number): Promise<void> => {
  if (!priceRequestId) {
    throw new Error('Price request id is required');
  }

  const API_URL = apiUrl();

  const response = await fetch(`${API_URL}/price-requests/${priceRequestId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const data = await response.text();
    throw new Error(`${response.statusText} : ${data}`);
  }

  revalidatePath('/price-requests')
};
