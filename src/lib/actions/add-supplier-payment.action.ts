"use server"

import { z } from 'zod'
import { FormState } from '../form-state';
import { apiUrl, parseFormDataToJSON } from '../utils';
import { redirect } from 'next/navigation';

const fields = {
    paymentMethod : z.enum(['cash', 'check', 'credit_card', 'bank_transfer', 'paypal', 'sexe', 'other']),
    purchaseOrderId: z.number().nonnegative(),
    notes: z.any().optional(),
    amount: z.number().nonnegative(),
    paymentDate: z.string().refine(val => !isNaN(Date.parse(val)), {
        message: "Invalid date",
    }).optional(),}

const schema = z.object(fields);

export const addSupplierPayment= async (prevState: FormState<typeof fields>, formData: FormData): Promise<FormState<typeof fields>> => {

    const validated = schema.safeParse(parseFormDataToJSON(formData));

    if (!validated.success) {
        console.error(validated.error);
        return { success: false, errors: validated.error.format() }
    }

    try {
        const response = await fetch(`${apiUrl()}/supplier-payments`, {
           method: 'POST',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify(validated.data),
        });

        if (!response.ok) {
           const message = await response.text();
           console.log(response);
           throw new Error(`${response.statusText} : ${message}`);
        }

    } catch (error) {
        console.error("Fail to sikish the supplier payment", error);
        return { success: false, message: (error as Error).message };
    }

    redirect(`/purchase-orders/${validated.data.purchaseOrderId}/payments`);
}
