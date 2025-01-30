"use server"

import { z } from 'zod'
import { FormState } from '../form-state';
import { apiUrl, parseFormDataToJSON } from '../utils';
import { redirect } from 'next/navigation';

const fields = {
    successProbability: z.number({'message': "La probabilité de succès doit être un nombre entre 0 et 100%"}).nonnegative().max(100),
    status : z.enum(['progress', 'validated', 'cancelled']),
    price: z.number({ message: "Insérez un prix" }).nonnegative(),
    clientId: z.number().nonnegative(),
    productId: z.number().nonnegative(), 
}

const schema = z.object(fields);

export const addQuote= async (prevState: FormState<typeof fields>, formData: FormData): Promise<FormState<typeof fields>> => {

    const validated = schema.safeParse(parseFormDataToJSON(formData));

    if (!validated.success) {
        console.error(validated.error);
        return { success: false, errors: validated.error.format() }
    }

    try {

        const response = await fetch(`${apiUrl()}/quotes`, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            const message = await response.text();
            throw new Error(`${response.statusText} : ${message}`);
        }

    } catch (error) {
        console.error("Fail to create quote", error);
        return { success: false, message: (error as Error).message };
    }

    redirect('/quotes');

}