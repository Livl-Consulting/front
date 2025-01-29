"use server"

import { z } from 'zod'
import { FormState } from '../form-state';
import { apiUrl, parseFormDataToJSON } from '../utils';
import { redirect } from 'next/navigation';

const productFields = {
    name: z.string({ message: "Le nom doit être renseigné" }),
    description: z.string().optional(),
    price: z.number({message : "Le prix doit être renseigné"}).nonnegative(),
    type: z.enum(["sale", "purchase", "both"], { message: "Le type de produit doit être renseigné" }),
}

const schema = z.object(productFields);

export const addProduct = async (prevState: FormState<typeof productFields>, formData: FormData): Promise<FormState<typeof productFields>> => {

    try {
        const validated = schema.safeParse(parseFormDataToJSON(formData));

        if (!validated.success) {
            console.error(validated.error);
            return { success: false, errors: validated.error.format() }
        }

        const response = await fetch(`${apiUrl()}/products`, {
            method: 'POST',
            body: formData,
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