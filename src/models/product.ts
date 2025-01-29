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