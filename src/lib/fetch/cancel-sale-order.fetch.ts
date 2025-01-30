"use server"

import { revalidatePath } from "next/cache";
import { apiUrl } from "../utils";

export const cancelSaleOrder = async (saleOrderId: number): Promise<void> => {
  if (!saleOrderId) {
    throw new Error('Sale order id is required');
  }

  const API_URL = apiUrl();

  const response = await fetch(`${API_URL}/orders/${saleOrderId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const data = await response.text();
    throw new Error(`${response.statusText} : ${data}`);
  }

  revalidatePath('/orders')
};
