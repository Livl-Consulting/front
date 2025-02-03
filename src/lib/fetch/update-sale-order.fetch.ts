"use server"

import { revalidatePath } from "next/cache";
import { apiUrl } from "../utils";
import {SaleOrderStatus} from "@/models/sale-order-status";

export const updateSaleOrder = async (saleOrderId: number, newStatus: SaleOrderStatus): Promise<void> => {
  if (!saleOrderId) {
    throw new Error('Sale order id is required');
  }

  const API_URL = apiUrl();

  const response = await fetch(`${API_URL}/orders/${saleOrderId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status: newStatus }),
  });

  if (!response.ok) {
    const data = await response.text();
    throw new Error(`${response.statusText} : ${data}`);
  }

  revalidatePath('/orders')
};
