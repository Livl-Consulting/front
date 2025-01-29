import { PaymentMethod } from "./payment-method";
import { PurchaseOrder } from "./purchase-order";
import { Supplier } from "./supplier";

export type SupplierPayment = {
    id: number;
    supplierId: number;
    supplier: Supplier;
    amount: number;
    notes?: string;
    paymentMethod: PaymentMethod;
    paymentDate: string;
    purchaseOrderId: number;
    purchaseOrder: PurchaseOrder;
    createdAt: string;
    updatedAt: string;
};