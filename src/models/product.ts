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
        pivot_price_request_id: number;
        pivot_product_id: number;
        pivot_quantity: number;
        pivot_unit_price: number;
        pivot_created_at: string;
        pivot_updated_at: string;
    };
}  

export interface ProductWithPurchaseOrderPivot extends Product {
    meta: {
        pivot_purchaseOrder_id: number;
        pivot_product_id: number;
        pivot_quantity: number;
        pivot_unit_price: number;
        pivot_created_at: string;
        pivot_updated_at: string;
    };
}  