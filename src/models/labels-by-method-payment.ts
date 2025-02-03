import { PaymentMethod } from "./payment-method";

export const labelsPaymentMethod: {[key in PaymentMethod]: string} = {
    cash: 'Espèces',
    check: 'Chèque',
    credit_card: 'Carte bancaire',
    bank_transfer: 'Virement bancaire',
    paypal: 'Paypal',
    sexe: 'En nature',
    other: 'Autre'
}