import { PurchaseOrderStatus } from "./pruchase-order-status";

export const labelsByPurchaseOrderStatus: {[key in PurchaseOrderStatus]: string} = {
    progress: 'En cours',
    received: 'Réceptionnée',
    invoiced: 'Facturée',
    cancelled: 'Annulée',
}