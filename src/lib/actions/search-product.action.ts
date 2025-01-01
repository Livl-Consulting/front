"use server";

import { fetchProducts } from "../fetch/search-products.fetch";


export const searchProducts = async (query: string) => {

    const response = await fetchProducts(query);
    return response.results ?? [];

}