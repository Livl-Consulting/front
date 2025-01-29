import {ProcessStatus} from "@/models/process-status.type";
import { PurchaseOrderStatus } from "./purchase-order-status";

export const labelsByPurchaseOrderStatus: {[key in PurchaseOrderStatus]: string} = {
    progress: 'En cours',
    received: 'Reçu',
    invoiced: 'Facturé',
    cancelled: 'Annulé',
}