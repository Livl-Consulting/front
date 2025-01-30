import {ProcessStatus} from "@/models/process-status.type";
import { ProductType } from "./product-type";

export const labelsByProductsType: {[key in ProductType]: string} = {
    sale: 'Vente',
    purchase: 'Achat',
    both: 'Vente & Achat',
}