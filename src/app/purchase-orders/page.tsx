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
import { FileText, Package, PackageCheck } from "lucide-react";
import {formatDate} from "@/lib/date-utils";
import { ProcessStatusBadge } from "@/components/process-status-badge";
import { PurchaseOrder } from "@/models/purchase-order";
import { labelsByPurchaseOrderStatus } from "@/models/labels-by-purchase-order-status";
import { Dialog } from "@radix-ui/react-dialog";
import { DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { HeaderTitle } from "@/components/header-title";
import PurchaseOrderAction from "./purchase-order-action";

export default async function Page() {
  const response = await fetch(`${apiUrl()}/purchase-orders`, { cache: "no-cache" });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const responseJson = await response.json() as any[];
  const purchaseOrders = responseJson.map((purchaseOrder: any) => ({
    ...purchaseOrder,
    products: purchaseOrder.products.map((product: any) => ({
      ...product,
    })),
  })) as PurchaseOrder[];
 
  return (
    <>
      <HeaderTitle  title="Commandes d'achats" />
      <Table>
        <TableCaption>Vos commandes - Flux achats</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">N°</TableHead>
            <TableHead className="text-center">Demande de prix</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead className="text-center">Fournisseur</TableHead>
            <TableHead className="text-center">Date achat</TableHead>
            <TableHead className="text-center">Prix total</TableHead>
            <TableHead className="text-center">Produits commandés</TableHead>
            <TableHead className="text-center">Bon commande</TableHead>
            <TableHead className="text-center">Echéance</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {purchaseOrders.map((purchaseOrder) => (
            <TableRow key={purchaseOrder.id}>
              <TableCell className="text-center">{purchaseOrder.id}</TableCell>
              <TableCell className="text-center">{purchaseOrder.priceRequestId || '-'}</TableCell>
              <TableCell className="text-center">
                <ProcessStatusBadge status={purchaseOrder.status} props={labelsByPurchaseOrderStatus[purchaseOrder.status]} />
              </TableCell>
              <TableCell className="font-medium text-center">
                {purchaseOrder.supplier.firstName} {purchaseOrder.supplier.lastName} ({purchaseOrder.supplier.companyName})
              </TableCell>
              <TableCell className="text-center">{formatDate(purchaseOrder.createdAt)}</TableCell>
              <TableCell className="text-center">{purchaseOrder.totalAmount}€</TableCell>
              <TableCell className="text-center">
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
                        {purchaseOrder.products.map((product) => (
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
              <TableCell className="text-center">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline"><FileText /></Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl">
                    <DialogHeader>
                      <DialogTitle>Visionnage du bon de commande</DialogTitle>
                      <DialogDescription>
                        Le bon de commande est disponible en PDF pour téléchargement.
                      </DialogDescription>
                    </DialogHeader>
                    <iframe 
                      src={`${apiUrl()}/purchase-orders/generate-pdf/${purchaseOrder.id}`} 
                      className="w-full h-[80vh]"
                      />
                  </DialogContent>
                </Dialog>
              </TableCell>
              <TableCell className="text-center">{formatDate(purchaseOrder.dueDate)}</TableCell>
              <TableCell>
                <PurchaseOrderAction purchaseOrder={purchaseOrder} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
