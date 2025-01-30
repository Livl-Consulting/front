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
import { Edit, FileText, HandCoins, Package, PackageCheck } from "lucide-react";
import {formatDate} from "@/lib/date-utils";
import { ProcessStatusBadge } from "@/components/process-status-badge";
import { PurchaseOrder } from "@/models/purchase-order";
import { labelsByPurchaseOrderStatus } from "@/models/labels-by-purchase-order-status";
import { Dialog } from "@radix-ui/react-dialog";
import { DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Link from "next/link";
import { HeaderTitle } from "@/components/header-title";

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
    })),
  })) as PurchaseOrder[];
 
  return (
    <>
      <HeaderTitle  title="Commandes d'achats" />
      <Table>
        <TableCaption>Vos commandes - Flux achats</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Status</TableHead>
            <TableHead>Fournisseur</TableHead>
            <TableHead>Produits commandés</TableHead>
            <TableHead>Date achat</TableHead>
            <TableHead>Bon commande</TableHead>
            <TableHead>Paiements</TableHead>
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
              <TableCell>{formatDate(purchaseOrder.createdAt)}</TableCell>
              <TableCell>
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
              <TableCell>
                  <Button variant="outline" asChild>
                    <Link href={`/purchase-orders/${purchaseOrder.id}/payments`}>
                      <HandCoins />
                    </Link>
                  </Button>
              </TableCell>
              <TableCell>
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
    </>
  );
}
