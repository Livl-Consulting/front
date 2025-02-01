"use server"

import { z } from 'zod'
import { FormState } from '../form-state';
import { apiUrl, parseFormDataToJSON } from '../utils';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

const fields = {
    status : z.enum(['progress', 'received', 'invoiced', 'cancelled']),
    supplierId: z.number().nonnegative(),
    products: z.array(z.object({
        id: z.number().nonnegative(),
        quantity: z.number().nonnegative().min(1),
        unit_price: z.number().nonnegative(),
    })),
}

const schema = z.object(fields);

export const addPurchaseOrder= async (prevState: FormState<typeof fields>, formData: FormData): Promise<FormState<typeof fields>> => {

    const validated = schema.safeParse(parseFormDataToJSON(formData));

    if (!validated.success) {
        console.error(validated.error);
        return { success: false, errors: validated.error.format() }
    }

    try {
        const response = await fetch(`${apiUrl()}/purchase-orders`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(validated.data),
        });

        if (!response.ok) {
            const message = await response.text();
            throw new Error(`${response.statusText} : ${message}`);
        }

    } catch (error) {
        console.error("Fail to sikish the purchase order", error);
        return { success: false, message: (error as Error).message };
    }

    revalidatePath('/purchase-orders');
    redirect('/purchase-orders');
}
