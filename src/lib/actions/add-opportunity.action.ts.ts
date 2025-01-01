"use server"

import { z } from 'zod'
import { FormState } from '../form-state';
import { apiUrl, parseFormDataToJSON } from '../utils';
import { redirect } from 'next/navigation';

const fields = {
    successProbability: z.number().int().min(0).max(100),
    status : z.enum(['progress', 'validated', 'cancelled']),
    price: z.number().nonnegative(),
    clientId: z.number().nonnegative(),
    productId: z.number().nonnegative(), 
}

const schema = z.object(fields);

export const addOpportunity = async (prevState: FormState<typeof fields>, formData: FormData): Promise<FormState<typeof fields>> => {

    const validated = schema.safeParse(parseFormDataToJSON(formData));

    if (!validated.success) {
        console.error(validated.error);
        return { success: false, errors: validated.error.format() }
    }

    try {

        const response = await fetch(`${apiUrl()}/opportunities`, {
            method: 'POST',
        });

        if (!response.ok) {
            const message = await response.text();
            throw new Error(`${response.statusText} : ${message}`);
        }

    } catch (error) {
        console.error("Fail to edit artist", error);
        return { success: false, message: (error as Error).message };
    }

    redirect('/products');

}