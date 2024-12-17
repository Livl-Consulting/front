"use server"

import { z } from 'zod'
import { FormState } from '../form-state';
import { apiUrl, parseFormDataToJSON } from '../utils';
import { redirect } from 'next/navigation';

export const productFields = {
    name: z.string({ message: "Le nom doit être renseigné" }),
    description: z.string().optional(),
    price: z.number().nonnegative()
}

const schema = z.object(productFields);

export const addProduct = async (prevState: FormState<typeof productFields>, formData: FormData): Promise<FormState<typeof productFields>> => {

    const validated = schema.safeParse(parseFormDataToJSON(formData));

    if (!validated.success) {
        console.error(validated.error);
        return { success: false, errors: validated.error.format() }
    }

    try {

        const response = await fetch(`${apiUrl()}/artists`, {
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