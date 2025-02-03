import {ClientPayment} from "@/models/client-payment";

export const getTotalDue = (totalPrice: number, payments: ClientPayment[]): number => {
  return totalPrice - payments.reduce((acc, payment) => acc + payment.amount, 0);
}