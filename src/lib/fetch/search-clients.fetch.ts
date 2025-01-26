
import { Client } from "@/models/client";
import { apiUrl } from "../utils";

export const fetchClients = async (query: string): Promise<{ results: Client[] }> => {

    if (!query) {
        return {
            results: []
        };
    };

    const API_URL = apiUrl();

    const params = new URLSearchParams({ query });
    const response = await fetch(`${API_URL}/clients/search?${params.toString()}`, {
        next: {
            tags: ['clients', `clients:${query}`],
            revalidate: 3600
        }
    });

    if (!response.ok) {
        const data = await response.text();
        throw new Error(`${response.statusText} ${data} (clients:${query})`);
    }

    return {
        results: await response.json()
    };
}