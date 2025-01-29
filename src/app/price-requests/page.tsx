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
import { PriceRequest } from "@/models/price-request";
import { ProcessStatusBadge } from "@/components/process-status-badge";

export default async function Page() {
  const response = await fetch(`${apiUrl()}/price-requests`);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const responseJson = await response.json() as any[];
  const priceRequests = responseJson.map((priceRequest: any) => ({
    ...priceRequest,
    products: priceRequest.products.map((product: any) => ({
      ...product,
      meta: {
        pivotPriceRequestId: product.meta.pivot_price_request_id,
        pivotProductId: product.meta.pivot_product_id,
        pivotQuantity: product.meta.pivot_quantity,
        pivotUnitPrice: product.meta.pivot_unit_price,
        pivotCreatedAt: product.meta.pivot_created_at,
        pivotUpdatedAt: product.meta.pivot_updated_at,
      },
    })),
  })) as PriceRequest[];
 
  return (
    <Table>
      <TableCaption>Vos saisies de demandes de prix</TableCaption>
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
        {priceRequests.map((priceRequest) => (
          <TableRow key={priceRequest.id}>
            <TableCell>
              <ProcessStatusBadge status={priceRequest.status} />
            </TableCell>
            <TableCell className="font-medium">
              {priceRequest.supplier.firstName} {priceRequest.supplier.lastName}
            </TableCell>
            <TableCell>
              <ul className="list-disc pl-4">
                {priceRequest.products.map((product) => (
                  <li key={product.id}>
                    {product.name} - {product.meta.pivotQuantity}x à {product.meta.pivotUnitPrice}€
                  </li>
                ))}
              </ul>
            </TableCell>
            <TableCell>{formatDate(priceRequest.updatedAt)}</TableCell>
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
