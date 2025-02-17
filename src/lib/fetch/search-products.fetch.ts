
import { apiUrl } from "../utils";
import { Product } from "@/models/product";

export const fetchProducts = async (query: string): Promise<{ results: Product[] }> => {

    if (!query) {
        return {
            results: []
        };
    };

    const API_URL = apiUrl();

    const params = new URLSearchParams({ query });

    const response = await fetch(`${API_URL}/products/search?${params.toString()}`, {
        next: {
            tags: ['products', `products:${query}`],
            revalidate: 3600
        }, 
        cache: 'no-cache'
    });

    if (!response.ok) {
        const data = await response.text();
        throw new Error(`${response.statusText} ${data} (products:${query})`);
    }

    return {
        results: await response.json()
    }

}