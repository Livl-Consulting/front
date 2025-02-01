import { PriceRequest } from "./price-request";
import { ProductWithPurchaseOrderPivot } from "./product";
import { PurchaseOrderStatus } from "./pruchase-order-status";
import { Supplier } from "./supplier";
import { SupplierPayment } from "./supplier-payment";

export type PurchaseOrder = {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    status: PurchaseOrderStatus;
    totalAmount: number;
    priceRequestId?: number;
    priceRequest?: PriceRequest;
    supplierId: number;
    supplier: Supplier;
    products: ProductWithPurchaseOrderPivot[];
    supplierPayments: SupplierPayment[]
}