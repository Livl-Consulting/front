"use server";

import { fetchClients } from "../fetch/search-clients.fetch";


export const searchClients = async (query: string) => {

    const response = await fetchClients(query);
    return response.results ?? [];

}