import { ProcessStatus } from "./process-status.type";
import { ProductWithPriceRequestPivot } from "./product";
import { Supplier } from "./supplier";

export type PriceRequest = {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    supplierId: number;
    supplier: Supplier;
    status: ProcessStatus; 
    products: ProductWithPriceRequestPivot[];
}