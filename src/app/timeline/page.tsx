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
import { FileText } from "lucide-react";
import { labelsBySaleOrderStatus } from "@/models/labels-by-sale-order-status";
import SaleOrderAction from "@/app/sale-orders/sale-order-action";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import {formatDate} from "@/lib/date-utils";
import {getTotalDue} from "@/lib/payment-utils";
  
  export default async function Page() {
    const response = await fetch(`${apiUrl()}/orders`, { cache: "no-cache" });
  
    if (!response.ok) {
      throw new Error(response.statusText);
    }
  
    const saleOrders = ((await response.json() as SaleOrder[]).filter((saleOrder) => !['invoiced', 'cancelled'].includes(saleOrder.status) ).sort((a, b) => a.dueDate > b.dueDate ? 1 : -1));
    const saleOrderTotalDueBySaleOrderId = saleOrders.reduce((acc, saleOrder) => {
        acc[saleOrder.id] = getTotalDue(saleOrder.price, saleOrder.clientPayments);
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
                        <TableHead className="text-center">Date limite de paiement</TableHead>
                        <TableHead className="text-center">N°</TableHead>
                        <TableHead className="text-center">N° devis</TableHead>
                        <TableHead className="text-center">Status</TableHead>
                        <TableHead>Client</TableHead>
                        <TableHead>Produit</TableHead>
                        <TableHead className="text-center">Prix</TableHead>
                        <TableHead className="text-center">Total dû</TableHead>
                        <TableHead className="text-center">Confirmation de commande</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {saleOrders.map((saleOrder) => (
                        <TableRow key={saleOrder.id}>
                            <TableCell className="text-center">{formatDate(saleOrder.dueDate)}</TableCell>
                          <TableCell className="text-center">{saleOrder.id}</TableCell>
                          <TableCell className="text-center">{saleOrder.quoteId}</TableCell>
                          <TableCell className="text-center">
                            <ProcessStatusBadge status={saleOrder.status} props={labelsBySaleOrderStatus[saleOrder.status]} />
                          </TableCell>
                          <TableCell className="font-medium">
                            {saleOrder.client.firstName} {saleOrder.client.lastName} ({saleOrder.client.companyName})
                          </TableCell>
                          <TableCell className="font-medium">{saleOrder.product.name}</TableCell>
                          <TableCell className="text-center">{saleOrder.price}€</TableCell>
                            <TableCell className="text-center">{saleOrderTotalDueBySaleOrderId[saleOrder.id]}€</TableCell>
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
                    Cette application facilite la gestion des flux de vente et d&apos;achat en offrant une interface intuitive et un suivi précis des transactions.
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    </>
    );
  }
  