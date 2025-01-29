import { ProductWithPurchaseOrderPivot } from "./product";
import { PurchaseOrderStatus } from "./purchase-order-status";
import { Supplier } from "./supplier";

export type PurchaseOrder = {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    status: PurchaseOrderStatus;
    supplierId: number;
    supplier: Supplier;
    products: ProductWithPurchaseOrderPivot[];
    //supplierPayments: SupplierPayment[]
}