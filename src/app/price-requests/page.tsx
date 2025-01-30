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
import { Edit, Package, PackageCheck } from "lucide-react";
import Link from "next/link";
import {formatDate} from "@/lib/date-utils";
import { PriceRequest } from "@/models/price-request";
import { ProcessStatusBadge } from "@/components/process-status-badge";
import { labelsByProcessStatus } from "@/models/labels-by-opportunity-status";
import { HeaderTitle } from "@/components/header-title";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import PriceRequestAction from "./price-request-action";

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
    })),
  })) as PriceRequest[];
 
  return (
    <>
      <HeaderTitle title="Demandes de prix" />
      <Table>
        <TableCaption>Vos saisies de demandes de prix</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Status</TableHead>
            <TableHead>Fournisseur</TableHead>
            <TableHead>Produits demandés</TableHead>
            <TableHead>Mise à jour</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {priceRequests.map((priceRequest) => (
            <TableRow key={priceRequest.id}>
              <TableCell>
                <ProcessStatusBadge status={priceRequest.status} props={labelsByProcessStatus[priceRequest.status]} />
              </TableCell>
              <TableCell className="font-medium">
                {priceRequest.supplier.firstName} {priceRequest.supplier.lastName}
              </TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">
                      <PackageCheck />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl">
                    <DialogHeader>
                      <DialogTitle>Produits de la commande</DialogTitle>
                      <DialogDescription>
                        Liste des produits commandés avec leur quantité et prix unitaire.
                      </DialogDescription>
                    </DialogHeader>
                      <ul className="list-disc space-y-2">
                        {priceRequest.products.map((product) => (
                          <li key={product.id} className="flex justify-between">
                            <span className="flex gap-2"><Package /> {product.name}</span>
                            <span>
                              <span>
                                {product.meta.pivot_quantity} x {product.meta.pivot_unit_price}€ = <strong>{product.meta.pivot_quantity * product.meta.pivot_unit_price}€</strong></span>
                            </span>
                          </li>
                        ))}
                      </ul>
                  </DialogContent>
                </Dialog>
              </TableCell>
              <TableCell>{formatDate(priceRequest.updatedAt)}</TableCell>
              <TableCell className="text-right">
                <PriceRequestAction priceRequest={priceRequest} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
