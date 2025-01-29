"use server";

import { fetchSuppliers } from "../fetch/search-suppliers.fetch";

export const searchSuppliers = async (query: string) => {
    const response = await fetchSuppliers(query);
    return response.results ?? [];
}