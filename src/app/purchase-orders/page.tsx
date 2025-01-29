import { Button } from "@/components/ui/button";
import {
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/table";
import { apiUrl } from "@/lib/utils";
import { Edit } from "lucide-react";
import Link from "next/link";
import {formatDate} from "@/lib/date-utils";
import { ProcessStatusBadge } from "@/components/process-status-badge";
import { PurchaseOrder } from "@/models/purchase-order";
import { labelsByPurchaseOrderStatus } from "@/models/labels-by-purchase-order-status";

export default async function Page() {
  const response = await fetch(`${apiUrl()}/purchase-orders`);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const responseJson = await response.json() as any[];
  const purchaseOrders = responseJson.map((purchaseOrder: any) => ({
    ...purchaseOrder,
    products: purchaseOrder.products.map((product: any) => ({
      ...product,
      meta: {
        pivotPurchaseOrderId: product.meta.pivot_purchase_order_id,
        pivotProductId: product.meta.pivot_product_id,
        pivotQuantity: product.meta.pivot_quantity,
        pivotUnitPrice: product.meta.pivot_unit_price,
        pivotCreatedAt: product.meta.pivot_created_at,
        pivotUpdatedAt: product.meta.pivot_updated_at,
      },
    })),
  })) as PurchaseOrder[];

  console.log(purchaseOrders);
 
  return (
    <Table>
      <TableCaption>Vos saisies de commandes - Flux achats</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Status</TableHead>
          <TableHead>Fournisseur</TableHead>
          <TableHead>Produits</TableHead>
          <TableHead>Mise à jour</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {purchaseOrders.map((purchaseOrder) => (
          <TableRow key={purchaseOrder.id}>
            <TableCell>
              <ProcessStatusBadge status={purchaseOrder.status} props={labelsByPurchaseOrderStatus[purchaseOrder.status]} />
            </TableCell>
            <TableCell className="font-medium">
              {purchaseOrder.supplier.firstName} {purchaseOrder.supplier.lastName}
            </TableCell>
            <TableCell>
              <ul className="list-disc pl-4">
                {purchaseOrder.products.map((product) => (
                  <li key={product.id}>
                    {product.name} - {product.meta.pivotQuantity}x à {product.meta.pivotUnitPrice}€
                  </li>
                ))}
              </ul>
            </TableCell>
            <TableCell>{formatDate(purchaseOrder.updatedAt)}</TableCell>
            <TableCell className="text-right">
              <Button variant="ghost" size="icon" asChild>
                <Link href={`#`}>
                  <Edit size={16} />
                </Link>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
