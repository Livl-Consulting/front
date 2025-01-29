import { PriceRequest } from "./price-request";
import { PurchaseOrder } from "./purchase-order";
import { SupplierPayment } from "./supplier-payment";

export type Supplier = {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    lastName: string;
    firstName: string;
    companyName?: string;
    email: string;
    purchaseOrders: PurchaseOrder[];
    priceRequests: PriceRequest[];
    supplierPayments: SupplierPayment[];
}