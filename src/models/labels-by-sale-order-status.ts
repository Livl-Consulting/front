import { SaleOrderStatus } from "./sale-order-status";

export const labelsBySaleOrderStatus: {[key in SaleOrderStatus]: string} = {
    progress: 'En cours',
    delivered: 'Livrée',
    invoiced: 'Facturée',
    cancelled: 'Annulé',
}