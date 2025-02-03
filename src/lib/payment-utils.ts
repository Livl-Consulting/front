import {ClientPayment} from "@/models/client-payment";
import {SupplierPayment} from "@/models/supplier-payment";

export const getTotalDue = (totalPrice: number, payments: ClientPayment[] | SupplierPayment[]): number => {
  return totalPrice - payments.reduce((acc, payment) => acc + payment.amount, 0);
}