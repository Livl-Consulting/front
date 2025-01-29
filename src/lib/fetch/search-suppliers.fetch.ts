import { Supplier } from "@/models/supplier";
import { apiUrl } from "../utils";

export const fetchSuppliers = async (query: string): Promise<{ results: Supplier[] }> => {

    if (!query) {
        return {
            results: []
        };
    };

    const API_URL = apiUrl();

    const params = new URLSearchParams({ query });
    const response = await fetch(`${API_URL}/suppliers/search?${params.toString()}`, {
        next: {
            tags: ['suppliers', `suppliers:${query}`],
            revalidate: 3600
        },
        cache: 'no-cache'
    });

    if (!response.ok) {
        const data = await response.text();
        throw new Error(`${response.statusText} ${data} (suppliers:${query})`);
    }

    return {
        results: await response.json()
    };
}