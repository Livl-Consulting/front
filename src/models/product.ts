import { ProductType } from "./product-type";

export type Product = {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    description: string;
    price: number;
    type: ProductType;
}

export interface ProductWithPriceRequestPivot extends Product {
    meta: {
        pivotPriceRequestId: number;
        pivotProductId: number;
        pivotQuantity: number;
        pivotUnitPrice: number;
        pivotCreatedAt: string;
        pivotUpdatedAt: string;
    };
}  

export interface ProductWithPurchaseOrderPivot extends Product {
    meta: {
        pivotPurchaseOrderId: number;
        pivotProductId: number;
        pivotQuantity: number;
        pivotUnitPrice: number;
        pivotCreatedAt: string;
        pivotUpdatedAt: string;
    };
}  