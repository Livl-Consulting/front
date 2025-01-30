"use server"

import { revalidatePath } from "next/cache";
import { apiUrl } from "../utils";

export const cancelOpportunity = async (opportunityId: number): Promise<void> => {
  if (!opportunityId) {
    throw new Error('Opportunity id is required');
  }

  const API_URL = apiUrl();

  const response = await fetch(`${API_URL}/opportunities/${opportunityId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const data = await response.text();
    throw new Error(`${response.statusText} : ${data}`);
  }

  revalidatePath('/opportunities')
};
