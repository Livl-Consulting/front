"use server"

import { z } from 'zod'
import { FormState } from '../form-state';
import { apiUrl, parseFormDataToJSON } from '../utils';
import { redirect } from 'next/navigation';

export const clientFields = {
    firstName: z.string({ message: "Le prénom doit être renseigné" }),
    lastName: z.string({ message: "Le nom doit être renseigné" }),
    companyName: z.string({ message: "Le nom de l'entreprise doit être renseigné" }).optional(),
    email: z.string({ message: "L'email doit être renseigné" }).email("L'email n'est pas valide"),
}

const schema = z.object(clientFields);

export const addClient = async (prevState: FormState<typeof clientFields>, formData: FormData): Promise<FormState<typeof clientFields>> => {

    const validated = schema.safeParse(parseFormDataToJSON(formData));

    if (!validated.success) {
        console.error(validated.error);
        return { success: false, errors: validated.error.format() }
    }

    try {
        const response = await fetch(`${apiUrl()}/clients`, {
            method: 'POST',
        });

        if (!response.ok) {
            const message = await response.text();
            throw new Error(`${response.statusText} : ${message}`);
        }

    } catch (error) {
        console.error("Fail to sikish client", error);
        return { success: false, message: (error as Error).message };
    }

    redirect('/products');

}