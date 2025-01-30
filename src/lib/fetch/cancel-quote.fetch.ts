"use server"

import { revalidatePath } from "next/cache";
import { apiUrl } from "../utils";

export const cancelQuote = async (quoteId: number): Promise<void> => {
  if (!quoteId) {
    throw new Error('Quote id is required');
  }

  const API_URL = apiUrl();

  const response = await fetch(`${API_URL}/quotes/${quoteId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const data = await response.text();
    throw new Error(`${response.statusText} : ${data}`);
  }

  revalidatePath('/quotes')
};
