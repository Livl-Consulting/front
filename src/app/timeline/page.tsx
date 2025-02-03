import {
    TableCaption,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
    Table,
  } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { apiUrl } from "@/lib/utils";
import {ProcessStatusBadge} from "@/components/process-status-badge";
import { HeaderTitle } from "@/components/header-title";
import { SaleOrder } from "@/models/sale-order";
import { Button } from "@/components/ui/button";
import {FileText, Package, PackageCheck} from "lucide-react";
import { labelsBySaleOrderStatus } from "@/models/labels-by-sale-order-status";
import SaleOrderAction from "@/app/sale-orders/sale-order-action";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import {formatDate} from "@/lib/date-utils";
import {getTotalDue} from "@/lib/payment-utils";
import {labelsByPurchaseOrderStatus} from "@/models/labels-by-purchase-order-status";
import PurchaseOrderAction from "@/app/purchase-orders/purchase-order-action";
import {PurchaseOrder} from "@/models/purchase-order";
  
  export default async function Page() {
    const saleOrdersResponse = await fetch(`${apiUrl()}/orders`, { cache: "no-cache" });
  
    if (!saleOrdersResponse.ok) {
      throw new Error(saleOrdersResponse.statusText);
    }
  
    const saleOrders = ((await saleOrdersResponse.json() as SaleOrder[]).filter((saleOrder) => !['invoiced', 'cancelled'].includes(saleOrder.status) ).sort((a, b) => a.dueDate > b.dueDate ? 1 : -1));
    const saleOrderTotalDueBySaleOrderId = saleOrders.reduce((acc, saleOrder) => {
        acc[saleOrder.id] = getTotalDue(saleOrder.price, saleOrder.clientPayments);
        return acc;
    }, {} as Record<number, number>);

      const purchaseOrderResponse = await fetch(`${apiUrl()}/purchase-orders`, { cache: "no-cache" });

      if (!purchaseOrderResponse.ok) {
          throw new Error(purchaseOrderResponse.statusText);
      }

      const responseJson = await purchaseOrderResponse.json() as any[];
      const purchaseOrders = (responseJson.map((purchaseOrder: any) => ({
          ...purchaseOrder,
          products: purchaseOrder.products.map((product: any) => ({
              ...product,
          })),
      })) as PurchaseOrder[]).filter((purchaseOrder) => !['invoiced', 'cancelled'].includes(purchaseOrder.status) ).sort((a, b) => a.dueDate > b.dueDate ? 1 : -1);

      const purchaseOrderTotalDueByPurchaseOrderId = purchaseOrders.reduce((acc, purchaseOrder) => {
            acc[purchaseOrder.id] = getTotalDue(purchaseOrder.totalAmount, purchaseOrder.supplierPayments);
            return acc;
      }, {} as Record<number, number>);

    return (
    <>
        <HeaderTitle  title="Échéancier" />
        <Accordion type={'multiple'}>
            <AccordionItem value={'sale-order'}>
                <AccordionTrigger>Commande de vente</AccordionTrigger>
                <AccordionContent>
                  <Table>
                    <TableCaption>Vos échéances</TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-center">N°</TableHead>
                        <TableHead className="text-center">Date limite de paiement</TableHead>
                        <TableHead className="text-center">Prix total</TableHead>
                        <TableHead className="text-center">Prix restant dû</TableHead>
                        <TableHead className="text-center">Status</TableHead>
                        <TableHead>Client</TableHead>
                        <TableHead>Produit</TableHead>
                        <TableHead className="text-center">Confirmation de commande</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {saleOrders.map((saleOrder) => (
                        <TableRow key={saleOrder.id}>
                          <TableCell className="text-center">{saleOrder.id}</TableCell>
                          <TableCell className="text-center">{formatDate(saleOrder.dueDate)}</TableCell>
                          <TableCell className="text-center">{saleOrder.price}€</TableCell>
                          <TableCell className="text-center">{saleOrderTotalDueBySaleOrderId[saleOrder.id]}€</TableCell>
                          <TableCell className="text-center">
                            <ProcessStatusBadge status={saleOrder.status} props={labelsBySaleOrderStatus[saleOrder.status]} />
                          </TableCell>
                          <TableCell className="font-medium">
                            {saleOrder.client.firstName} {saleOrder.client.lastName} ({saleOrder.client.companyName})
                          </TableCell>
                          <TableCell className="font-medium">{saleOrder.product.name}</TableCell>
                          <TableCell className="text-center">
                              <Dialog>
                                  <DialogTrigger asChild>
                                      <Button variant="outline"><FileText /></Button>
                                  </DialogTrigger>
                                  <DialogContent className="max-w-3xl">
                                      <DialogHeader>
                                      <DialogTitle>Visionnage de la confirmation de commande</DialogTitle>
                                      <DialogDescription>
                                          La confirmation de commande est disponible en PDF pour téléchargement.
                                      </DialogDescription>
                                      </DialogHeader>
                                      <iframe
                                      src={`${apiUrl()}/orders/generate-pdf/${saleOrder.id}`}
                                      className="w-full h-[80vh]"
                                      />
                                  </DialogContent>
                              </Dialog>
                          </TableCell>
                          <TableCell>
                            <SaleOrderAction saleOrder={saleOrder} />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value={'item-2'}>
                <AccordionTrigger>Commande d&#39;achat</AccordionTrigger>
                <AccordionContent>
                    <Table>
                        <TableCaption>Vos commandes - Flux achats</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="text-center">N°</TableHead>
                                <TableHead className="text-center">Date limite de paiement</TableHead>
                                <TableHead className="text-center">Prix total</TableHead>
                                <TableHead className="text-center">Prix restant dû</TableHead>
                                <TableHead className="text-center">Status</TableHead>
                                <TableHead className="text-center">Fournisseur</TableHead>
                                <TableHead className="text-center">Date achat</TableHead>
                                <TableHead className="text-center">Produits commandés</TableHead>
                                <TableHead className="text-center">Bon commande</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {purchaseOrders.map((purchaseOrder) => (
                                <TableRow key={purchaseOrder.id}>
                                    <TableCell className="text-center">{purchaseOrder.id}</TableCell>
                                    <TableCell className="text-center">{formatDate(purchaseOrder.dueDate)}</TableCell>
                                    <TableCell className="text-center">{purchaseOrder.totalAmount}€</TableCell>
                                    <TableCell className="text-center">{purchaseOrderTotalDueByPurchaseOrderId[purchaseOrder.id]}€</TableCell>
                                    <TableCell className="text-center">
                                        <ProcessStatusBadge status={purchaseOrder.status} props={labelsByPurchaseOrderStatus[purchaseOrder.status]} />
                                    </TableCell>
                                    <TableCell className="font-medium text-center">
                                        {purchaseOrder.supplier.firstName} {purchaseOrder.supplier.lastName} ({purchaseOrder.supplier.companyName})
                                    </TableCell>
                                    <TableCell className="text-center">{formatDate(purchaseOrder.createdAt)}</TableCell>
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
                                    <TableCell>
                                        <PurchaseOrderAction purchaseOrder={purchaseOrder} />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    </>
    );
  }
  