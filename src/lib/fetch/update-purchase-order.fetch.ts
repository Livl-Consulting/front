"use server"

import { revalidatePath } from "next/cache";
import { apiUrl } from "../utils";
import {PurchaseOrderStatus} from "@/models/pruchase-order-status";

export const updatePurchaseOrder = async (purchaseOrderId: number, newStatus: PurchaseOrderStatus): Promise<void> => {
  if (!purchaseOrderId) {
    throw new Error('Price request id is required');
  }

  const API_URL = apiUrl();

  const response = await fetch(`${API_URL}/purchase-orders/${purchaseOrderId}`, {
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

  revalidatePath('/purchase-orders')
};
