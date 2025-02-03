"use server"

import { z } from 'zod'
import { FormState } from '../form-state';
import { apiUrl, parseFormDataToJSON } from '../utils';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

const fields = {
    status : z.enum(['progress', 'delivered', 'invoiced', 'cancelled']),
    clientId: z.number().nonnegative(),
    dueDate: z.string().refine(val => !isNaN(Date.parse(val)), {
        message: "Invalid date",
    }),
    productId: z.number().nonnegative(),
    price: z.number({ message: "Insérez un prix" }).nonnegative(),
}

const schema = z.object(fields);

export const addSaleOrder= async (prevState: FormState<typeof fields>, formData: FormData): Promise<FormState<typeof fields>> => {

    const validated = schema.safeParse(parseFormDataToJSON(formData));

    if (!validated.success) {
        console.error(validated.error);
        return { success: false, errors: validated.error.format() }
    }

    try {
        const response = await fetch(`${apiUrl()}/orders`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(validated.data),
        });

        if (!response.ok) {
            const message = await response.text();
            throw new Error(`${response.statusText} : ${message}`);
        }

    } catch (error) {
        console.error("Fail to sikish the sale order", error);
        return { success: false, message: (error as Error).message };
    }

    revalidatePath('/sale-orders');
    redirect('/sale-orders');
}
